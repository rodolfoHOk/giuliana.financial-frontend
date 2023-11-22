import { CnabForm } from './components/cnab-form';
import { TransactionsList } from './components/transactions-list';

function App() {
  return (
    <main className="bg-neutral-900 text-gray-200 flex flex-col w-full min-h-screen">
      <div className="mx-6 my-8 flex justify-center">
        <h1 className="text-3xl font-bold text-yellow-600">
          Transações financeiras
        </h1>
      </div>

      <CnabForm />

      <TransactionsList />
    </main>
  );
}

export default App;
