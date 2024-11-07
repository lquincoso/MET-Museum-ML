import pymysql
import streamlit as st
import pandas as pd
from datetime import datetime, timedelta

class InteractionsDashboard:
    def __init__(self):
        # Load keys from file
        self.keys = self._load_keys()
        
        # Establish connection
        self.connection = self._create_connection()
        self.cursor = self.connection.cursor()

    def _load_keys(self):
        keys = {}
        try:
            with open('keys.txt', 'r') as file:
                for line in file:
                    key, value = line.strip().split('=')
                    keys[key] = value
            return keys
        except FileNotFoundError:
            st.error("keys.txt file not found. Please ensure it exists in the same directory.")
            return None
        except Exception as e:
            st.error(f"Error reading keys file: {str(e)}")
            return None

    def _create_connection(self):
        try:
            return pymysql.connect(
                host=self.keys['HOST'],
                user=self.keys['USERNAME'],
                password=self.keys['PASSWORD'],
                database=self.keys['DATABASE']
            )
        except Exception as e:
            st.error(f"Database connection error: {str(e)}")
            return None

    def get_total_users(self):
        query = """
        SELECT COUNT(*) as total_users,
               COUNT(CASE WHEN status = 'active' THEN 1 END) as active_users,
               COUNT(CASE WHEN status = 'inactive' THEN 1 END) as inactive_users,
               COUNT(CASE WHEN status = 'suspended' THEN 1 END) as suspended_users
        FROM users
        WHERE deleted_at IS NULL
        """
        return self._execute_query(query)

    def get_monthly_interactions(self):
        query = """
        SELECT 
            DATE_FORMAT(created_at, '%Y-%m') as month,
            COUNT(CASE WHEN type = 'like' THEN 1 END) as likes,
            COUNT(CASE WHEN type = 'dislike' THEN 1 END) as dislikes,
            COUNT(CASE WHEN type = 'favorite' THEN 1 END) as favorites
        FROM interactions
        WHERE deleted_at IS NULL
        GROUP BY DATE_FORMAT(created_at, '%Y-%m')
        ORDER BY month DESC
        LIMIT 12
        """
        return self._execute_query(query)

    def get_top_images(self):
        query = """
        SELECT 
            image_id,
            COUNT(*) as total_interactions,
            COUNT(CASE WHEN type = 'like' THEN 1 END) as likes
        FROM interactions
        WHERE deleted_at IS NULL
        GROUP BY image_id
        ORDER BY total_interactions DESC
        LIMIT 10
        """
        return self._execute_query(query)

    def get_active_today(self):
        query = """
        SELECT COUNT(DISTINCT user_id) as active_users
        FROM interactions
        WHERE created_at >= NOW() - INTERVAL 1 DAY AND deleted_at IS NULL
        """
        return self._execute_query(query)

    def get_user_interaction_stats(self):
        query = """
        SELECT 
            u.username,
            COUNT(CASE WHEN i.type = 'like' AND i.deleted_at IS NULL THEN 1 END) as likes,
            COUNT(CASE WHEN i.type = 'dislike' AND i.deleted_at IS NULL THEN 1 END) as dislikes,
            COUNT(CASE WHEN i.type = 'favorite' AND i.deleted_at IS NULL THEN 1 END) as favorites
        FROM users u
        LEFT JOIN interactions i ON u.user_id = i.user_id
        WHERE u.deleted_at IS NULL
        GROUP BY u.user_id
        """
        return self._execute_query(query)

    def get_recent_user_activity(self):
        query = """
        SELECT 
            u.username,
            i.type,
            i.image_id,
            i.created_at
        FROM interactions i
        JOIN users u ON i.user_id = u.user_id
        WHERE i.deleted_at IS NULL AND u.deleted_at IS NULL
        ORDER BY i.created_at DESC
        LIMIT 20
        """
        return self._execute_query(query)

    def _execute_query(self, query):
        try:
            self.cursor.execute(query)
            columns = [desc[0] for desc in self.cursor.description]
            results = self.cursor.fetchall()
            return pd.DataFrame(results, columns=columns)
        except Exception as e:
            st.error(f"Query execution error: {str(e)}")
            return pd.DataFrame()

    def get_dashboard_data(self):
        return {
            'user_stats': self.get_total_users().to_dict('records')[0] if not self.get_total_users().empty else {},
            'monthly_interactions': self.get_monthly_interactions().to_dict('records'),
            'top_images': self.get_top_images().to_dict('records'),
            'active_today': self.get_active_today().to_dict('records')[0] if not self.get_active_today().empty else {},
            'user_interaction_stats': self.get_user_interaction_stats().to_dict('records'),
            'recent_user_activity': self.get_recent_user_activity().to_dict('records')
        }

    def close(self):
        if hasattr(self, 'cursor') and self.cursor:
            self.cursor.close()
        if hasattr(self, 'connection') and self.connection:
            self.connection.close()

def main():
    st.title("User Interactions Dashboard")

    # Initialize dashboard
    dashboard = InteractionsDashboard()
    
    try:
        # Get data
        data = dashboard.get_dashboard_data()

        # Display metrics
        col1, col2, col3, col4, col5 = st.columns(5)
        
        with col1:
            st.metric("Total Users", data['user_stats'].get('total_users', 0))
        with col2:
            st.metric("Active Users", data['user_stats'].get('active_users', 0))
        with col3:
            st.metric("Inactive Users", data['user_stats'].get('inactive_users', 0))
        with col4:
            st.metric("Suspended Users", data['user_stats'].get('suspended_users', 0))
        with col5:
            st.metric("Active Today", data['active_today'].get('active_users', 0))

        # Monthly Interactions Chart
        st.subheader("Monthly Interactions")
        monthly_df = pd.DataFrame(data['monthly_interactions'])
        if not monthly_df.empty:
            st.line_chart(monthly_df.set_index('month')[['likes', 'dislikes', 'favorites']])

        # Top Images Chart
        st.subheader("Top Images by Interactions")
        top_images_df = pd.DataFrame(data['top_images'])
        if not top_images_df.empty:
            st.bar_chart(top_images_df.set_index('image_id')[['total_interactions', 'likes']])

        # User Interaction Statistics
        st.subheader("User Interaction Statistics")
        user_stats_df = pd.DataFrame(data['user_interaction_stats'])
        if not user_stats_df.empty:
            st.dataframe(user_stats_df)

        # Recent User Activity
        st.subheader("Recent User Activity")
        recent_activity_df = pd.DataFrame(data['recent_user_activity'])
        if not recent_activity_df.empty:
            st.dataframe(recent_activity_df)

    except Exception as e:
        st.error(f"An error occurred: {str(e)}")
    
    finally:
        dashboard.close()

if __name__ == "__main__":
    main()
