from django.conf.urls import url

from . import views

urlpatterns = [
    url(
        r'^municipality/',
        views.MunicipalityView.as_view(),
        name='municipality'
    ),
    url(
        r'^user'/,
        views.UserView.as_view(),
        name='user'
    ),
    url(
        r'^sensor/',
        views.SensorView.as_view(),
        name='sensor'
    ),
    url(
        r'^payment/',
        views.PaymentView.as_view(),
        name='sensor'
    ),
]
