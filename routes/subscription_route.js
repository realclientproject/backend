import express from 'express';
import SubscriptionController from '../controllers/subscription_controller.js';
const router = express.Router();

router.get('/:id', SubscriptionController.getSubscription);
router.get('/', SubscriptionController.getAllSubscriptions);
router.put('/:id', SubscriptionController.editSubscription);
router.delete('/:id', SubscriptionController.deleteSubscription);
router.post('/', SubscriptionController.addSubscription)

export default router;
