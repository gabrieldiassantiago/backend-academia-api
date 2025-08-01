import {expect, test, describe, it, beforeEach} from 'vitest';
import { RegisterService } from './register.service';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository';
import { register } from 'module';
import { UserAlreadyExistsError } from '../errors/user-already-exists';


let usersRepository: InMemoryUsersRepository;
let registerUseCase: RegisterService;

describe('Testes de Autenticação', () => {

       beforeEach( () => {
        usersRepository = new InMemoryUsersRepository();
        registerUseCase = new RegisterService(usersRepository);
        }) // recriando o repositório a cada teste
    
    it('Deve criar um usuário com sucesso', async () => {

        const email = 'john.doe22@example.com';

        const {user} = await registerUseCase.execute({
            name: 'John Doe',
            email: email,
            password: 'password123',
        })

        const isPasswordCorrectHash = await 
        compare('password123', user.password);

        expect(isPasswordCorrectHash).toBe(true);
    })
    

    it('Não deve permitir cadastro com email duplicado', async () => {
        const inMemoryUsers = new InMemoryUsersRepository();
        const registerUseCase = new RegisterService(inMemoryUsers);

        const email = 'john.doe22@example.com';

        await registerUseCase.execute({
            name: 'John Doe',
            email: email,
            password: 'password123',
        })

        await expect(() => registerUseCase.execute({
            name: 'John Doe',
            email,
            password: 'password123'
        })).rejects.toBeInstanceOf(UserAlreadyExistsError);
    })

});