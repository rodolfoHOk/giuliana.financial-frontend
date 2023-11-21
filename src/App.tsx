import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { ReportTransaction } from './model/report-transactions';
import { RefreshCwIcon } from 'lucide-react';

const BASE_URL = 'http://localhost:8080';

function App() {
  const [transactions, setTransactions] = useState<ReportTransaction[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const fetchTransactions = async () => {
    const response = await axios.get<ReportTransaction[]>(
      `${BASE_URL}/transactions`
    );

    setTransactions(response.data);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files ? event.target.files[0] : null);
  };

  const uploadFile = async () => {
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    axios.post(`${BASE_URL}/cnab/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <main className="bg-neutral-900 text-gray-200 flex flex-col w-full">
      <div className="mx-6 my-8 flex justify-center">
        <h1 className="text-3xl font-bold">Transações financeiras</h1>
      </div>

      <div className="mx-6 flex flex-col gap-2 bg-neutral-800 p-4 rounded">
        <h2 className="text-2xl font-bold">Importação de CNAB</h2>

        <form className="flex gap-4">
          <div className="flex flex-col">
            <label className="bg-blue-600 px-3 py-2 rounded font-semibold hover:bg-blue-500 hover:cursor-pointer transition-colors">
              Escolha o arquivo
              <input
                className="hidden"
                type="file"
                accept=".txt"
                onChange={handleFileChange}
              />
            </label>
          </div>

          <button
            disabled={!file?.name}
            className="bg-blue-800 px-3 py-2 rounded font-semibold hover:bg-blue-700 hover:cursor-pointer transition-colors disabled:bg-gray-700 disabled:cursor-not-allowed"
            onClick={uploadFile}
          >
            Enviar arquivo
          </button>
        </form>
      </div>

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
                  <h3 className="font-bold text-lg">{report.storeName}</h3>

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

                <table className="flex flex-col">
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

                  <tbody>
                    {report.transactions.map((transaction) => (
                      <tr
                        className="w-full grid grid-cols-8 justify-center items-center text-sm odd:bg-neutral-800 even:bg-neutral-900 rounded-sm"
                        key={transaction.id}
                      >
                        <td className="flex justify-center">
                          {transaction.card}
                        </td>
                        <td className="flex justify-center">
                          {transaction.cpf}
                        </td>
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
    </main>
  );
}

export default App;
