//http://localhost:8888/.netlify/functions/create-payment-intent

//domain/.netlify/functions/create-payment-intent

const stripe = require("stripe")(
  "sk_test_51JyoqeEvsdpwmyHyvYzAkq4V1T9Yu9YxITlZnWiI7Unll31V5m0QEcQWkiddjh3JSZgvrhmxh7Jw5uKFRytzsy7b00cNq79RwN"
);

exports.handler = async function (event, context) {
  if (event.body) {
    const { cart, shipping_fee, total_amount } = JSON.parse(event.body);

    const calculateOrderAmount = () => {
      return shipping_fee + total_amount;
    };

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: "usd",
      });

      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: error.message }),
      };
    }
  }
  return {
    statusCode: 200,
    body: "Create payment intent",
  };
};
