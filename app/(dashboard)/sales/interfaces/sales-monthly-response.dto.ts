export interface SalesMonthly {
  monthly: Sale[];
  weekly: Weekly[];
}

export interface Sale {
  _id: string;
  user: User;
  brand: Brand;
  sellDate: Date;
  description: string;
  amount: number;
  __v: number;
}

export interface User {
  _id: string;
  name: string;
  avatar: string;
  color: string;
  email: string;
    __v: number;
}

export enum Brand {
  ChicPijamas = "Chic pijamas",
  NikkitaStyles = "Nikkita Styles",
  WithFlow = "With Flow",
}

export interface Weekly {
  week: string;
  items: Sale[];
}
