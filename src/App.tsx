import { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { ReportTransaction } from './model/report-transactions';

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
    <main>
      <div>
        <h1>Importação de CNAB</h1>
      </div>

      <form>
        <label>Escolha o arquivo</label>
        <input type="file" accept=".txt" onChange={handleFileChange} />

        <button onClick={uploadFile}>Enviar arquivo</button>
      </form>

      <div>
        <h2>Transações</h2>

        <ul>
          {transactions.map((report) => (
            <li key={report.storeName}>
              <table>
                <thead>
                  <tr>
                    <th>Cartão</th>
                    <th>CPF</th>
                    <th>Data</th>
                    <th>Dono da loja</th>
                    <th>Hora</th>
                    <th>Nome da loja</th>
                    <th>Tipo</th>
                    <th>Valor</th>
                  </tr>
                </thead>

                <tbody>
                  {report.transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.card}</td>
                      <td>{transaction.cpf}</td>
                      <td>{transaction.date}</td>
                      <td>{transaction.storeOwner}</td>
                      <td>{transaction.time}</td>
                      <td>{transaction.storeName}</td>
                      <td>{transaction.type}</td>
                      <td>{transaction.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default App;
