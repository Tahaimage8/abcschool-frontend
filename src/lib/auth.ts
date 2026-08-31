import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";
import { UserRole } from "@/types/auth";

const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env");
}

const client = new MongoClient(uri);
const db = client.db("school");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "MEMBER" satisfies UserRole,
        input: false,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          return {
            data: {
              ...user,
              role: "MEMBER",
            },
          };
        },
      },
    },
  },
  plugins: [
    admin({
      defaultRole: "MEMBER",
      adminRole: ["ADMIN", "PRINCIPAL"],
    }),
  ],
  emailAndPassword: {
    enabled: true,
  },
});