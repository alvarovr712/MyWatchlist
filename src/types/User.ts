export interface User {
    name: string;
    surname: string;
    email : string;
    password: string;
    favorites: string[];
    watchlist: string[];
    phone:string;
    country:string;
    createdAt: Date;
}