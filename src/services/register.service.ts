import { hash } from 'bcryptjs';
import { z } from 'zod';
import { prisma } from '../lib/prima';

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export async function registerService(input: RegisterInput) {
  // Validação com Zod
  const registerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerSchema.parse(input);

  // Verifica se o usuário já existe
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error('Usuário já existe');
  }

  // Hash da senha
  const hashedPassword = await hash(password, 6);

  // Criação do usuário
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return user;
}
