
import express from 'express';
import * as aiController from '../controllers/ai.controller.js';
import * as userController from '../controllers/user.controller.js';
import * as galleryController from '../controllers/gallery.controller.js';
import * as paymentController from '../controllers/payment.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { rateLimiter } from '../middleware/rateLimiter.middleware.js';

const router = express.Router();

// AI Generation Routes
router.post('/generate-image', authenticate, rateLimiter, aiController.generateImage);
router.post('/generate-timeline', authenticate, rateLimiter, aiController.generateTimeline);
router.post('/chat', authenticate, rateLimiter, aiController.chatWithCharacter);

// User & Subscription Routes
router.get('/user/history', authenticate, userController.getHistory);
router.post('/subscribe', authenticate, userController.handleSubscription);

// Payment Specific Routes
router.post('/payments/mpesa/stk', authenticate, paymentController.initiateMpesa);
router.post('/payments/stripe/create-session', authenticate, paymentController.createStripeSession);
router.post('/payments/paypal/create-order', authenticate, paymentController.createPaypalOrder);
router.post('/payments/webhook/:provider', paymentController.paymentWebhook);

// Gallery Routes
router.get('/gallery/trending', galleryController.getTrending);
router.get('/gallery/community', galleryController.getCommunity);

export default router;
