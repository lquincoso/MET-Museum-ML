from django.contrib import admin
from api.models import User, Profile, ArtworkRating

class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email']


class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'email']

admin.site.register(User, UserAdmin)
admin.site.register(Profile,ProfileAdmin)
admin.site.register(ArtworkRating)