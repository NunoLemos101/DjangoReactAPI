# Generated by Django 3.1 on 2020-08-26 05:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0002_auto_20200825_2200'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='isPrivate',
            field=models.BooleanField(default=False),
        ),
    ]
