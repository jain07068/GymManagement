from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from django.conf import settings
import math

def userLogin(request):
    res = {
        'error' : 1,
        'msg' : 'Internal server error'
    }
    try:
        return render(request, 'user/login.html', {
        })
    except Exception as error:
        print(error)
        res['error'] = 1
        res['msg'] = 'Internal server error'

    return JsonResponse(res)

# Create your views here.
def userDashboard(request):
    res = {
        'error' : 1,
        'msg' : 'Internal server error'
    }
    try:
        return render(request, 'dashboard/index.html', {
        })
    except Exception as error:
        print(error)
        res['error'] = 1
        res['msg'] = 'Internal server error'

    return JsonResponse(res)

def addCustomer(request):
    pass