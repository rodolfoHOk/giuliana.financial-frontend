import { useEffect, useState } from 'react';
import { RefreshCwIcon } from 'lucide-react';
import axios from 'axios';
import { ReportTransaction } from '../model/report-transactions';
import { BASE_URL } from '../constants/constants';

export function TransactionsList() {
  const [transactions, setTransactions] = useState<ReportTransaction[]>([]);

  const fetchTransactions = async () => {
    const response = await axios.get<ReportTransaction[]>(
      `${BASE_URL}/transactions`
    );
    setTransactions(response.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="mx-6 mt-8 flex flex-col gap-2 bg-neutral-800 p-4 rounded">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold">Transações</h2>

        <button
          className="w-fit bg-yellow-600 px-3 py-2 rounded font-semibold hover:bg-yellow-500 text-gray-900 hover:cursor-pointer transition-colors flex gap-2 items-center"
          onClick={fetchTransactions}
        >
          <RefreshCwIcon size={16} />
          Atualizar transações
        </button>
      </div>

      <ul className="flex flex-col gap-2">
        {transactions.map((report) => (
          <li
            className="flex flex-col bg-neutral-900 p-6 rounded"
            key={report.storeName}
          >
            <div className="flex flex-col">
              <div className="flex justify-between pb-2">
                <h3 className="font-bold text-lg text-yellow-600">
                  {report.storeName}
                </h3>

                <span className="font-bold text-sm">
                  {report.total >= 0 ? (
                    <span className="text-green-600">
                      Total: R$ {report.total.toFixed(2)}
                    </span>
                  ) : (
                    <span className="text-red-600">
                      Total: -R$ {Math.abs(report.total).toFixed(2)}
                    </span>
                  )}
                </span>
              </div>

              <table className="flex flex-col gap-1">
                <thead>
                  <tr className="w-full grid grid-cols-8">
                    <th className="flex justify-center">Cartão</th>
                    <th className="flex justify-center">CPF</th>
                    <th className="flex justify-center">Data</th>
                    <th className="flex justify-center">Dono da loja</th>
                    <th className="flex justify-center">Hora</th>
                    <th className="flex justify-center">Nome da loja</th>
                    <th className="flex justify-center">Tipo</th>
                    <th className="flex justify-center">Valor</th>
                  </tr>
                </thead>

                <tbody className="flex flex-col gap-1">
                  {report.transactions.map((transaction) => (
                    <tr
                      className="w-full grid grid-cols-8 justify-center items-center text-sm odd:bg-neutral-800 even:bg-neutral-900 rounded-sm"
                      key={transaction.id}
                    >
                      <td className="flex justify-center">
                        {transaction.card}
                      </td>
                      <td className="flex justify-center">{transaction.cpf}</td>
                      <td className="flex justify-center">
                        {transaction.date}
                      </td>
                      <td className="flex justify-center">
                        {transaction.storeOwner}
                      </td>
                      <td className="flex justify-center">
                        {transaction.time}
                      </td>
                      <td className="flex justify-center">
                        {transaction.storeName}
                      </td>
                      <td className="flex justify-center">
                        {transaction.type}
                      </td>
                      <td className="flex justify-center">
                        {transaction.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
