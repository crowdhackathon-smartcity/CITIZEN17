# -*- coding: utf-8 -*-
# Generated by Django 1.11.1 on 2017-05-13 15:29
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('consumption', '0003_auto_20170513_1514'),
    ]

    operations = [
        migrations.AlterField(
            model_name='consumption',
            name='date',
            field=models.DateField(),
        ),
    ]
