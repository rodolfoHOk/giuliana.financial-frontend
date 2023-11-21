function App() {
  return (
    <main>
      <div>
        <h1>Importação de CNAB</h1>
      </div>

      <form>
        <label>Escolha o arquivo</label>
        <input type="file" accept=".txt" />

        <button>Enviar arquivo</button>
      </form>

      <div>
        <h2>Transações</h2>

        <ul>
          <li>
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
                <tr>
                  <td>transaction.card</td>
                  <td>transaction.cpf</td>
                  <td>transaction.date</td>
                  <td>transaction.storeOwner</td>
                  <td>transaction.time</td>
                  <td>transaction.storeName</td>
                  <td>transaction.type</td>
                  <td>transaction.amount</td>
                </tr>
              </tbody>
            </table>
          </li>
        </ul>
      </div>
    </main>
  );
}

export default App;
