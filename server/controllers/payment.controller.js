
import * as paymentService from '../services/payment.service.js';

/**
 * M-Pesa STK Push Request
 */
export const initiateMpesa = async (req, res, next) => {
  try {
    const { phoneNumber, amount } = req.body;
    const result = await paymentService.mpesaService.initiateStkPush(phoneNumber, amount);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    next(error);
  }
};

/**
 * Stripe Checkout Session Request
 */
export const createStripeSession = async (req, res, next) => {
  try {
    const { priceId } = req.body;
    const result = await paymentService.stripeService.createCheckoutSession(req.user.id, priceId);
    res.status(200).json({ success: true, url: result.url });
  } catch (error) {
    next(error);
  }
};

/**
 * PayPal Order Request
 */
export const createPaypalOrder = async (req, res, next) => {
  try {
    const { amount } = req.body;
    const result = await paymentService.paypalService.createOrder(amount);
    res.status(201).json({ success: true, orderId: result.orderId });
  } catch (error) {
    next(error);
  }
};

/**
 * General Payment Callback / Webhook
 */
export const paymentWebhook = async (req, res) => {
  const provider = req.params.provider; // e.g., 'mpesa', 'stripe', 'paypal'
  console.log(`[Payment Webhook] Received update from ${provider}`);
  
  // Logic to switch based on provider and process data
  res.status(200).send("EVENT_RECEIVED");
};
