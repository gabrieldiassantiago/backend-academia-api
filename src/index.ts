// src/server.ts
import fastify from 'fastify';
import { z } from 'zod';
import { prisma } from './lib/prima';
import { registerController } from './http/controllers/register.controller';
import { appRoutes } from './http/routes';

const app = fastify(); // Cria instância do Fastify


app.register(appRoutes)

// Inicializa o servidor
const PORT = process.env.PORT ? Number(process.env.PORT) : 2222;

app.listen({ port: PORT }, (err, address) => {
  if (err) {
    console.error('Erro ao iniciar o servidor:', err);
    process.exit(1);
  }
  console.log(`🚀 Servidor rodando em ${address}`);
});
