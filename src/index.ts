// src/server.ts
import fastify from 'fastify';
import { z } from 'zod';
import { prisma } from './lib/prima';
import { registerController } from './http/controllers/register.controller';
import { appRoutes } from './http/routes';

const app = fastify(); // Cria instância do Fastify


app.register(appRoutes)


app.setErrorHandler((error, _, reply) => {
    if (error instanceof z.ZodError) {
        return reply.status(400).send({
            message: 'Erro de validação',
            issues: error.format(),
        })
    }

    return reply.status(500).send({
        message: 'Erro interno do servidor',
        error: error.message,
    });
});


app.listen({ port: 2222 }, (err, address) => {
  if (err) {
    console.error('Erro ao iniciar o servidor:', err);
    process.exit(1);
  }
  console.log(`🚀 Servidor rodando em ${address}`);
});
