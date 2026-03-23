from django.http import JsonResponse
from rest_framework_simplejwt.authentication import JWTAuthentication


class JWTMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.jwt_auth = JWTAuthentication()
        # object used to decode tokens

    def __call__(self, request):
        try:
            user_auth = self.jwt_auth.authenticate(request)
            # returns (user, token) if valid

            if user_auth is not None:
                request.user, _ = user_auth
        except Exception:
            return JsonResponse({'error': 'Invalid Token'}, status=401)

        return self.get_response(request)