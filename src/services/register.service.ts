import { hash } from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '../lib/prima';
import { PrismaUsersRepository } from '../repositories/users.repository';

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export async function registerService(input: RegisterInput) {

    const hashedPassword = await hash(input.password, 8);

    const existingUser = await prisma.user.findUnique({
        where: {
            email: input.email,
        },
    });

    if (existingUser) {
        throw new Error('Usuário já existe com este email');
    }

    const prismaUsersRepository = new PrismaUsersRepository();
    
    await prismaUsersRepository.createUser({
        name: input.name,
        email: input.email,
        password: hashedPassword,
    });
}
