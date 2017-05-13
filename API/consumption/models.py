# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

class Consumption(models.Model):
    consumed = models.PositiveIntegerField()
    paid = models.PositiveIntegerField()
    date = models.DateField()

class User(models.Model):
    consumed = models.PositiveIntegerField()
    paid = models.PositiveIntegerField()
    date = models.DateField()
