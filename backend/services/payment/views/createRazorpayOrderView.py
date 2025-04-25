from rest_framework import views, response, permissions
from django.conf import settings
import razorpay


class CreateRazorpayOrderView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        amount = request.data.get("amount")
        currency = "INR"
        
        if not amount:
            return response.Response({"error: Amount is required"}, status=400)
        
        try: 
            client = razorpay.Client(auth=(settings.RAZORPAY_API_KEY, settings.RAZORPAY_API_SECRET))
            
            # RAZORPAY EXPECTS AMOUNT IN PAISA
            razorpay_order = client.order.create({
                "amount": int(float(amount)*100),
                "currency": currency,
                "receipt": f"receipt_{request.user.id}_{amount}",
                "payment_capture": 1
            })
            
            return response.Response({
                "razorpay_order_id": razorpay_order["id"],
                "amount": razorpay_order["amount"],
                "currency": razorpay_order["currency"]
            }, status=201)
            
        except Exception as e:
            return response.Response({"error": str(e)}, status=500)
        