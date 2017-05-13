from django.conf.urls import url
from django.views.decorators.csrf import csrf_exempt

from . import views

urlpatterns = [
    url(
        r'^municipality/',
        views.MunicipalityView.as_view(),
        name='municipality'
    ),
    url(
        r'^user/',
        views.UserView.as_view(),
        name='user'
    ),
    url(
        r'^sensor/',
        csrf_exempt(views.SensorView.as_view()),
        name='sensor'
    ),
    url(
        r'^payment/',
        csrf_exempt(views.PaymentView.as_view()),
        name='sensor'
    ),
]
