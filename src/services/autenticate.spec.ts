import { describe, expect, it } from "vitest";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { AuthenticateService } from "./authenticate.service";
import { hash } from "bcryptjs";

describe('Testes de Autenticação',  () => {
    it('Deve criar conseguir se autenticar com sucesso',  async () => {

        const usersRepository = new InMemoryUsersRepository();
        const authenticateUseCase = new AuthenticateService(usersRepository);
      
       await usersRepository.create({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: await hash('password123', 6) 
        })

        const {user} = await authenticateUseCase.execute({
            email: 'john.doe@example.com',
            password: 'password123'
        })

        expect(user.id).toEqual(expect.any(String));

    })
})