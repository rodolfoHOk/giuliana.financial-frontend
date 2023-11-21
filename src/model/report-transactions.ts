import { Transaction } from './transaction';

export interface ReportTransaction {
  storeName: string;
  total: number;
  transactions: Transaction[];
}
