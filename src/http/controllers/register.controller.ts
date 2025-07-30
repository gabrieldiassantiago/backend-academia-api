import z from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { UserAlreadyExistsError } from "../../errors/user-already-exists";
import { RegisterService } from "../../services/register.service";
import { PrismaUsersRepository } from "../../repositories/prisma-users-repository";

export async function registerController(request: FastifyRequest, reply: FastifyReply) {
    
   const registerBodySchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string().min(6),
   });

   const { name, email, password } = registerBodySchema.parse(request.body);

   try {
    const registerUseCase = new RegisterService(new PrismaUsersRepository());
        await registerUseCase.execute({
        name, email, password
    });
   } catch (error) {
    
        if (error instanceof UserAlreadyExistsError) {
            return reply.status(409).send({ error: error.message });
        }

        throw error; // Re-throw unexpected errors
   }

    return reply.status(201).send({
        'message': 'Usuário criado com sucesso',
    });
}