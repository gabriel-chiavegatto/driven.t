import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { bookingRoom, listBooking } from '@/controllers/booking-controller';

const bookingRouter = Router();

bookingRouter.all('/*', authenticateToken).get('', listBooking).post('', bookingRoom);
// .put("/:bookingId");

export { bookingRouter };
