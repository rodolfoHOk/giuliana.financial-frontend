export interface Transaction {
  id: number;
  type: number;
  date: string;
  amount: number;
  cpf: number;
  card: string;
  time: string;
  storeOwner: string;
  storeName: string;
}
