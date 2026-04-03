import { User } from "../types/User";

export const Users: User[] = [
  {
    name: "Admin",
    surname: "Test",
    email: "admin@example.com",
    password: "123",
    favorites: ["1", "2", "7"],
    watchlist: ["2", "5"],
    phone: "+34 600 123 456",
    country: "England",
    createdAt: new Date("2026-04-01"),
  },
  {
    name: "User",
    surname: "User1",
    email: "user@example.com",
    password: "123",
    favorites: [],
    watchlist: [],
     phone: "+34 685 149 368",
    country: "Spain",
    createdAt: new Date("2026-04-03"),
  },
];
