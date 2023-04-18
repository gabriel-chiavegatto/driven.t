import { TicketStatus } from '@prisma/client';
import { notFoundError } from '@/errors';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketRepository from '@/repositories/ticket-repository';

async function getTicketTypes() {
  const ticketTypes = await ticketRepository.getTicketTypes();
  if (!ticketTypes) throw notFoundError();

  return ticketTypes;
}
async function getUserTickets(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticket = await ticketRepository.getUserTickets(enrollment.id);
  if (!ticket) throw notFoundError();
}
async function createTicket(userId: number, ticketTypeId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw notFoundError();

  const ticketData = {
    ticketTypeId,
    enrollmentId: enrollment.id,
    status: TicketStatus.RESERVED,
  };
  await ticketRepository.createTicket(ticketData);
}

export default { getTicketTypes, getUserTickets, createTicket };
