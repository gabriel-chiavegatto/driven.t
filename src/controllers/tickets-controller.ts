import { Request, Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service';

export async function getTicketTypes(req: Request, res: Response) {
  try {
    const types = await ticketsService.getTicketTypes();
    return res.status(200).send(types);
  } catch (error) {
    return res.sendStatus(401);
  }
}
export async function getUserTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const tickets = await ticketsService.getUserTickets(userId);
    return res.status(200).send(tickets);
  } catch (error) {
    return res.sendStatus(401);
  }
}

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const { ticketTypeId } = req.body;
    const ticket = await ticketsService.createTicket(userId, ticketTypeId);
    return res.status(201);
  } catch (error) {
    return res.sendStatus(401);
  }
}
