import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import bookingService from '@/services/booking-services';

export async function listBooking(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const booking = await bookingService.getBooking(userId);

    return res.status(httpStatus.OK).send({ ...booking });
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
export async function bookingRoom(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const { roomId } = req.body;

    if (!roomId) return res.sendStatus(httpStatus.BAD_REQUEST);

    const booking = await bookingService.bookingRoomById(userId, roomId);

    return res.status(httpStatus.OK).send({
      bookingId: booking.id,
    });
  } catch (error) {
    res.sendStatus(httpStatus.NOT_FOUND);
  }
}
