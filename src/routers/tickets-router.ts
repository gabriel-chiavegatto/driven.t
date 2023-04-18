import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getTicketTypes, getUserTickets, createTicket } from '@/controllers';

const ticketsRouter = Router();

ticketsRouter.get('/types', authenticateToken, getTicketTypes);
ticketsRouter.get('/', authenticateToken, getUserTickets);
ticketsRouter.post('/', authenticateToken, createTicket);

export { ticketsRouter };
