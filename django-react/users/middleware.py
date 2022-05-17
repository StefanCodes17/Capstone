from django.conf import settings
import jwt
from users.models import User

class TokenMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.

        try:
            #print(f"Middleware : {request.headers.get('Authorization')}")
            access = request.headers.get('Authorization').split(' ')[1]
            #access = 
            user_id = jwt.decode(access, getattr(settings, "SECRET_KEY", None), getattr(settings, "SIMPLE_JWT")["ALGORITHM"])["user_id"]
            request.lifepad_user = User.objects.get(id=user_id)
            #print("Middleware: succesfully deserialized user")
        except:
            request.lifepad_user = None
            print("Middleware failed to deserialize user")
        
        response = self.get_response(request)

        # Code to be executed for each request/response after
        # the view is called.

        return response