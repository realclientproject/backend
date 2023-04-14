import express from 'express';
import UserController from '../controllers/user_controller.js';
const router = express.Router();

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUser);
router.put('/:id', UserController.editUser);
router.delete('/:id', UserController.deleteUser);
router.post('/', UserController.addUser)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)

export default router;
