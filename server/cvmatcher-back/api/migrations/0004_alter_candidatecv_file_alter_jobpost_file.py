# Generated by Django 5.2 on 2025-05-02 19:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_jobpost_education_levels_jobpost_experience_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='candidatecv',
            name='file',
            field=models.FileField(upload_to='media/candidate_cvs/'),
        ),
        migrations.AlterField(
            model_name='jobpost',
            name='file',
            field=models.FileField(upload_to='media/job_descriptions/'),
        ),
    ]
