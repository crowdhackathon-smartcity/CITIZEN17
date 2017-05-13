# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

class Consumption(models.Model):
    consumed = models.PositiveIntegerField()
    date = models.DateField()

class Payments(models.Model):
    paid = models.PositiveIntegerField()
