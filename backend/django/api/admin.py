from django.contrib import admin
from api.models import User, Profile, ArtworkRating
from django.urls import path
from .views import streamlit_dashboard


class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email']


class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'email']


class StreamlitDashboardAdmin(admin.AdminSite):
    site_header = 'Streamlit Dashboard'

    def get_urls(self):
        urls = super().get_urls()  
        my_urls = [
            path('streamlit-dashboard/', self.admin_view(streamlit_dashboard)),
        ]
        return my_urls + urls


admin.site.register(User, UserAdmin)
admin.site.register(Profile,ProfileAdmin)
admin.site.register(ArtworkRating)
streamlit_admin_site = StreamlitDashboardAdmin(name='StreamlitAdmin')

