# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.generic import View

from django.db.models import F

from .models import Consumption, Payments

import json, datetime


def getConsumed():
    year = datetime.datetime.now().year
    month = 03
    consumed_qset = Consumption.objects.filter(
        date__year__gte=year,
        date__month__gte=month
    )

    consumed = []
    for cons in consumed_qset:
        consumed.append(cons.consumed)

    return consumed


class UserView(View):
    def get(self, request):
        consumed = getConsumed()

        data = {
            'daily': consumed
        }

        return JsonResponse(data)


class MunicipalityView(View):
    def get(self, request):
        consumed = getConsumed()
        paid = Payments.objects.get(pk=1).paid
        data = {
            'consumed': consumed,
            'paid': paid,
            'daily': [
                consumed
            ]
        }

        return JsonResponse(data)


class SensorView(View):
    def post(self, request):
        date = "2017-03-" + str(datetime.datetime.now().day)
        consumption = Consumption.objects.filter(date=date)
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
