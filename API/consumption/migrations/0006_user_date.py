# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-05-13 16:27
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('consumption', '0005_auto_20170513_1611'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='date',
            field=models.DateField(default='2017-05-13'),
            preserve_default=False,
        ),
    ]
