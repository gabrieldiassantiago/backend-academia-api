import {expect, test, describe, it} from 'vitest';
import { RegisterService } from './register.service';
import { compare } from 'bcryptjs';

describe('Register Service', () => {
    it('Deve criar um usuário com sucesso', async () => {

      const registerCase = new RegisterService({
        findByEmail: async (_) => {
            return null; 
        },

        create: async (data) => {
            return {
                id: 'user-id',
                name: data.name,
                email: data.email,
                password: data.password,
                created_at: new Date(),
                updated_at: new Date()
            }
        }
       
      })

        const { user } = await registerCase.execute({
            name: 'John Doe',
            email: 'john.doe2@example.com',
            password: 'password123',
        })
        const isPasswordCorrectHash = await compare('password123', user.password);
        expect(isPasswordCorrectHash).toBe(true);
    })
})