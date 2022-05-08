from django.conf import settings
import jwt
from users.models import User

# Gets user if logged in, otherwise None
class Util:
    def get_user(request):
        #try:
        access = request.headers.get('Authorization').split(' ')[1]
        print(f'ACCESS = {access}')
        #access = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUxOTU0Nzk4LCJpYXQiOjE2NTE5NTIwOTgsImp0aSI6IjliNDVhN2ZmMGE1MzRhY2M4NGVjZDE1ODcyYTRkNGUwIiwidXNlcl9pZCI6MX0.H9pq5FCzBSvaxPHxvpY2Qn6PHs3QrGAPbld97KRpEd8"
        user_id = jwt.decode(access, getattr(settings, "SECRET_KEY", None), getattr(settings, "SIMPLE_JWT")["ALGORITHM"])["user_id"]
        user = User.objects.get(id=user_id)
        return user
        #except:
            #print(f'ACCESS = NOTHING')
            #return None
