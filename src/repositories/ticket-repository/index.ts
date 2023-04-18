import { Ticket } from '@prisma/client';
import { prisma } from '@/config';

async function getTicketTypes() {
  return prisma.ticketType.findMany();
}
async function getUserTickets(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: {
      enrollmentId,
    },
    include: {
      TicketType: true,
    },
  });
}
async function createTicket(ticketData: CreateTicketObject) {
  return prisma.ticket.create({
    data: {
      ...ticketData,
    },
  });
}

export type CreateTicketObject = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>;

export default { getTicketTypes, getUserTickets, createTicket };
