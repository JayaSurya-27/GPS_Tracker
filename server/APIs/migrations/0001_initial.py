# Generated by Django 4.2.8 on 2024-01-31 17:54

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BusLocation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bus_id', models.CharField(max_length=50, unique=True)),
                ('latitude', models.FloatField(help_text='Latitude of the bus')),
                ('longitude', models.FloatField(help_text='Longitude of the bus')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
            ],
        ),
    ]
