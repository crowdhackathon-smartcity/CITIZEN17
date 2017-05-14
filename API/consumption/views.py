# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.generic import View

from django.db.models import F

from .models import Consumption, User

import json, datetime


def getConsumptionQset():
    year = datetime.datetime.now().year
    month = datetime.datetime.now().month
    consumed_qset = Consumption.objects.filter(
        date__year__gte=year,
        date__month__gte=month
    )

    return consumed_qset


def getConsumed():
    consumption_qset = getConsumptionQset()

    consumed = []
    for cons in consumption_qset:
        consumed.append(cons.consumed)

    return consumed


def getPaid():
    consumption_qset = getConsumptionQset()

    paid = []
    for cons in consumption_qset:
        paid.append(cons.paid)

    return paid


class UserView(View):
    def get(self, request):
        now = datetime.datetime.now()

        user_qset = User.objects.filter(
            date__year__gte=now.year,
            date__month__gte=now.month
        )

        consumed = []
        for user in user_qset:
            consumed.append(user.consumed)

        data = {
            'daily': consumed
        }

        return JsonResponse(data)


class MunicipalityView(View):
    def get(self, request):
        consumed = getConsumed()
        paid = sum(getPaid())
        data = {
            'consumed': sum(consumed),
            'paid': paid,
            'daily': [
                consumed
            ]
        }

        return JsonResponse(data)


class SensorView(View):
    def post(self, request):
        date = datetime.datetime.now()
        consumption = Consumption.objects.filter(date=date)
        user = User.objects.filter(date=date)
        try:
            consumption.update(consumed=F('consumed') + int(request.POST['consumed']))
            user.update(consumed=F('consumed') + int(request.POST['consumed']))
        except TypeError:
            print "error: consumed is not an integer"

        return HttpResponse()


class PaymentView(View):
    def post(self, request):
        date = datetime.datetime.now()
        consumption = Consumption.objects.filter(date=date)
        try:
            consumption.update(paid=F('paid') + int(request.POST['paid']))
        except TypeError:
            print "error: consumed is not an integer"

        return HttpResponse()
