import {expect, test, describe, it} from 'vitest';
import { RegisterService } from './register.service';
import { compare } from 'bcryptjs';
import { InMemoryUsersRepository } from '../repositories/in-memory/in-memory-users-repository';
import { register } from 'module';

describe('Register Service', () => {
    
    it('Deve criar um usuário com sucesso', async () => {

    const inMemoryUsers = new InMemoryUsersRepository();
    const registerUseCase = new RegisterService(inMemoryUsers);

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
})