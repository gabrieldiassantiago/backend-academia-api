import z from "zod";
import { prisma } from "../../lib/prima";
import { FastifyReply, FastifyRequest } from "fastify";
import { hash } from "bcryptjs";
import { registerService } from "../../services/register.service";

export async function registerController(request: FastifyRequest, reply: FastifyReply) {
    
   const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
   });

   const { name, email, password } = registerBodySchema.parse(request.body);

   try {
    await registerService({
        name, email, password
    });
   } catch (error) {
       return reply.status(500).send({ error: 'Internal Server Error' });
   }

   return reply.status(201).send();
}