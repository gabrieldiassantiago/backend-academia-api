import fastify from "fastify";
import {  prisma  } from './lib/prima'
import {z} from "zod";


export const app = fastify({
    
})

app.post('/users', async (request, reply) => {

    const registerSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { name, email, password } = registerSchema.parse(request.body);

    const user = await prisma.user.create({
        data: {
            name,
            email,
            password
        }
    })
    return reply.status(201).send(user);

})