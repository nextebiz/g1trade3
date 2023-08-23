import NextAuth from "next-auth/next";
import { User } from "next-auth";
import { Role } from "@prisma/client";

type UserId = string;
type Phone1 = string;
type Phone2 = string;

declare module "next-auth" {
  interface JWT {
    id: UserId;
    role: Role;
    phone1: string;
    phone2: string;
  }
}

// declare module "next-auth" {
//   interface Session {
//       user: {
//           id: string;
//           email: string;
//           name: string;
//           image: string;
//           role: string;
//       };
//   }
// }

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      role: Role;
      phone1: string;
      phone2: string;
    };
  }
}
