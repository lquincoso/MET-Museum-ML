import pymysql
import streamlit as st
import pandas as pd
import requests
import matplotlib.pyplot as plt

class InteractionsDashboard:
    #=================#
    # Initialization  #
    #=================#

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

    #=================#
    #  Query Methods  #
    #=================#

    def get_total_users(self):
        query = """
        SELECT COUNT(*) as total_users,
               COUNT(CASE WHEN is_active = 1 THEN 1 END) as active_users,
               COUNT(CASE WHEN is_active = 0 THEN 1 END) as inactive_users
        FROM api_user
        """
        return self._execute_query(query)
    
    def get_most_active_hour(self):
        query = """
        SELECT 
            HOUR(created_at) as hour,
            COUNT(*) as interactions
        FROM api_artworkrating
        GROUP BY hour
        ORDER BY interactions DESC
        LIMIT 1
        """
        return self._execute_query(query)

    def get_ratings_leaderboard(self):
        query = """
        SELECT 
            artwork_id,
            ROUND(AVG(rating), 2) as average_rating,
            COUNT(rating) as total_ratings
        FROM api_artworkrating
        GROUP BY artwork_id
        ORDER BY average_rating DESC, total_ratings DESC
        LIMIT 10
        """
        return self._execute_query(query)

    def get_monthly_interactions(self):
        query = """
        SELECT 
            DATE_FORMAT(created_at, '%Y-%m') as month,
            COUNT(*) as total_ratings
        FROM api_artworkrating
        GROUP BY DATE_FORMAT(created_at, '%Y-%m')
        ORDER BY DATE_FORMAT(created_at, '%Y-%m') DESC
        LIMIT 12
        """
        return self._execute_query(query)
    
    def get_hourly_activity(self):
        query = """
        SELECT 
            HOUR(created_at) as hour,
            COUNT(*) as interactions
        FROM api_artworkrating
        GROUP BY hour
        ORDER BY hour ASC
        """
        return self._execute_query(query)

    def get_all_ratings(self):
        query = """
        SELECT 
            rating, 
            COUNT(*) as count
        FROM api_artworkrating
        GROUP BY rating
        ORDER BY rating ASC
        """
        return self._execute_query(query)

    def get_top_images(self):
        query = """
        SELECT 
            artwork_id,
            COUNT(*) as total_interactions
        FROM api_artworkrating
        GROUP BY artwork_id
        ORDER BY total_interactions DESC
        LIMIT 10
        """
        return self._execute_query(query)
    
    def get_users_registered_this_month(self):
        query = """
        SELECT 
            COUNT(*) as total_registered
        FROM api_user
        WHERE DATE_FORMAT(date_joined, '%Y-%m') = DATE_FORMAT(CURRENT_DATE, '%Y-%m')
        """
        return self._execute_query(query)

    #=================#
    # Utility Methods #
    #=================#

    def get_image_url(self, artwork_id):
        url = f"https://collectionapi.metmuseum.org/public/collection/v1/objects/{artwork_id}"

        response = requests.get(url)
        response_data = response.json()

        primary_image_url = response_data.get("primaryImageSmall")
        caption = response_data.get("title")

        return {
            "image_url": primary_image_url,
            "caption": caption
        }

    def _execute_query(self, query):
        try:
            self.cursor.execute(query)
            columns = [desc[0] for desc in self.cursor.description]
            results = self.cursor.fetchall()
            return pd.DataFrame(results, columns=columns)
        except Exception as e:
            st.error(f"Query execution error: {str(e)}")
            return pd.DataFrame()

    def close(self):
        if hasattr(self, 'cursor') and self.cursor:
            self.cursor.close()
        if hasattr(self, 'connection') and self.connection:
            self.connection.close()

#=================#
# Plotting Methods #
#=================#

#Function for donut chart
def plot_donut_chart(data):
    fig, ax = plt.subplots()
    ax.pie(
        data['Count'], 
        labels=data['Category'], 
        autopct='%1.1f%%', 
        startangle=90, 
        wedgeprops={'width': 0.3, 'edgecolor': 'w'},
        textprops={'color': 'white'}, 
        labeldistance=1.1
    )
    ax.set_aspect('equal')
    fig.patch.set_alpha(0)
    ax.patch.set_color('white')

    plt.setp(ax.get_xticklabels(), color='white')
    plt.setp(ax.get_yticklabels(), color='white')

    return fig

#Function for rating chart
def plot_ratings_chart(data):
    fig, ax = plt.subplots()
    ax.bar(
        data['rating'], 
        data['count'], 
        color=['#4CAF50' if r >= 3 else '#F44336' for r in data['rating']]# green for high, red for low ratings
    )
    
    ax.set_title('Artwork Ratings')
    ax.set_xlabel('Ratings')
    ax.set_ylabel('Number of Ratings')
    ax.set_xticks(data['rating'])
    ax.grid(axis='y', linestyle='--', alpha=0.7)
    
    return fig

#=================#
# Main Function   #
#=================#
def main():
    st.set_page_config(page_title="User Interactions Dashboard", layout="wide")

    st.title("User Interactions Dashboard")
    st.markdown("Welcome to the user interactions dashboard. Monitor metrics, visualize trends, and analyze activity effortlessly.")

    # Initialize dashboard
    dashboard = InteractionsDashboard()

    try:
        # Get data
        total_users = dashboard.get_total_users()
        monthly_interactions = dashboard.get_monthly_interactions()
        top_images = dashboard.get_top_images()
        users_registered_this_month = dashboard.get_users_registered_this_month()
        ratings_data = dashboard.get_all_ratings()
        most_active_hour = dashboard.get_most_active_hour()
        ratings_leaderboard = dashboard.get_ratings_leaderboard()
        hourly_activity = dashboard.get_hourly_activity()

        # Display Key Metrics
        st.subheader("Key Metrics")
        st.divider()
        col1, col2, col3 = st.columns(3)
        col1.metric("👥 Total Users", total_users['total_users'][0])
        col2.metric("🟢 Active Users", total_users['active_users'][0])
        col3.metric("⚪ Inactive Users", total_users['inactive_users'][0])
        st.divider()

        # Ratings Leaderboard
        st.header("Ratings Leaderboard")
        st.divider()
        if not ratings_leaderboard.empty:
            top_3 = ratings_leaderboard.head(3)
            cols = st.columns(3)

            for index, row in top_3.iterrows():
                with cols[index]:
                    st.subheader(f"Top {index + 1}")
                    image = dashboard.get_image_url(row['artwork_id'])
                    if image['image_url']:
                        st.image(image['image_url'], caption=image['caption'], use_container_width=True)
        else:
            st.info("No ratings data available.")
        st.divider()


        # Top Images
        st.subheader("Top Images by Interactions")
        if not top_images.empty:
            cols = st.columns(5)

            for index, row in top_images.iterrows():
                col_index = index % 5
                with cols[col_index]:
                    image = dashboard.get_image_url(row['artwork_id'])
                    if image['image_url']:
                        st.image(image['image_url'], caption=image['caption'], use_container_width=True)
        
        st.divider()
        # Monthly Interactions Chart
        st.subheader("Monthly Interactions")
        if not monthly_interactions.empty:
            st.bar_chart(monthly_interactions.set_index('month')['total_ratings'])

        col_1, col_2, col_3 = st.columns(3)

        # Users Registered This Month
        st.divider()
        if not users_registered_this_month.empty:
            total_registered = users_registered_this_month['total_registered'][0]
            remaining_users = dashboard.get_total_users()['total_users'][0] - total_registered

            # Data for the chart
            donut_data = pd.DataFrame({
                'Category': ['Registered This Month', 'Previously Registered'],
                'Count': [total_registered, remaining_users]
            })

            with col_3:
                # Plot the donut chart
                st.subheader("Users Registered This Month")
                st.pyplot(plot_donut_chart(donut_data))

        #Rating Distribution
        with col_1:
                st.subheader("Artwork Ratings Distribution")
                if not ratings_data.empty:
                    # Display ratings chart
                    fig = plot_ratings_chart(ratings_data)
                    st.pyplot(fig)
                else:
                    st.info("No ratings data available to display.")

        with col_2:
            
            st.subheader("Hourly Activity")
            if not hourly_activity.empty:
                st.bar_chart(hourly_activity.set_index('hour'))
            else:
                st.info("No activity data available.")

            # Most Active Hour
            st.subheader("Most Active Hour")
            if not most_active_hour.empty:
                hour = most_active_hour['hour'][0]
                interactions = most_active_hour['interactions'][0]
                st.metric(label="🕒 Most Active Hour", value=f"{hour}:00", delta=f"{interactions} interactions")
            else:
                st.info("No activity data available.")
            
    except Exception as e:
        st.error(f"❌ An error occurred: {str(e)}")
    finally:
        dashboard.close()

if __name__ == "__main__":
    main()
