export interface Instrument {
    id: string;
    name: string;
    symbol:string;
    price: number;
    change: number;
    history: number[];
}