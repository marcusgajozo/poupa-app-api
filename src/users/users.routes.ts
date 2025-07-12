import z from "zod";
import { FastifyTypedInstance } from "../types";
import { createUserSchema, getUsersSchema } from "./users.schemas";

const users: z.infer<typeof getUsersSchema> = [];

export function usersRoutes(server: FastifyTypedInstance) {
  server.get(
    "/users",
    {
      schema: {
        tags: ["Users"],
        description: "Get all users",
        response: {
          200: getUsersSchema,
        },
      },
    },
    () => {
      return users;
    }
  );

  server.post(
    "/users",
    {
      schema: {
        tags: ["Users"],
        description: "Create a new user",
        body: createUserSchema,

        response: {
          201: z.null().describe("User created successfully"),
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body;

      const newUser = {
        id: String(users.length + 1),
        name,
        email,
      };

      users.push(newUser);

      return reply.status(201).send();
    }
  );
}
