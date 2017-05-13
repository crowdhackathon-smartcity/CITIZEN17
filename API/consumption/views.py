# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse
from django.views.generic import View

from django.db.models import F

from .models import Consumption, Payments

class UserView(View):
    def get(self, request):
        pass

class MunicipalityView(View):
    def get(self, request):
        pass

class SensorView(View):
    def post(self, request):
        consumption = Consumption.objects.filter(pk=1)
        try:
            consumption.update(consumed=F('consumed') + int(request.POST['consumed']))
        except TypeError:
            print "error: consumed is not an integer"

        return HttpResponse()

class PaymentView(View):
    def post(self, request):
        payment = Payments.objects.filter(pk=1)
        try:
            payment.update(paid=F('paid') + int(request.POST['paid']))
        except TypeError:
            print "error: paid is not an integer"

        return HttpResponse()
