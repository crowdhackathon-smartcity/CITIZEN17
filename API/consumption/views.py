# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import View

class UserView(View):
    def get(self, request):
        pass

class MunicipalityView(View):
    def get(self, request):
        pass

class SensorView(View):
    def post(self, request):
        pass

class PaymentView(View):
    def post(self, request):
        pass
