import { User } from "../types/User";

export const Users: User[] = [
  {
    name: "Admin",
    surname: "Test",
    email: "admin@example.com",
    password: "123",
    favorites: ["1", "2","7"],
    watchlist: ["2", "5"],
  },
  {
    name: "User",
    surname: "User1",
    email: "user@example.com",
    password: "123",
    favorites: [],
    watchlist: [],
  },
];
