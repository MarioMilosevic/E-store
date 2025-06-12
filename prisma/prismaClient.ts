import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient()
  .$extends({
    name: "Protect password",
    query: {
      user: {
        async create({ args, query }) {
          args.data["password"] = bcrypt.hashSync(args.data["password"], 10);
          return query(args);
        },
      },
    },
  })
  .$extends({
    name: "Check passwords",
    model: {
      user: {
        async checkPassword(candidatePassword: string, userPassword: string) {
          return await bcrypt.compare(candidatePassword, userPassword);
        },
      },
    },
  });

export default prisma;
