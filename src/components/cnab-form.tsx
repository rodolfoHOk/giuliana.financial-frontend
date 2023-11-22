import { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants/constants';

export function CnabForm() {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files ? event.target.files[0] : null);
    setMessage(event.target.files ? event.target.files[0].name : '');
  };

  const uploadFile = async () => {
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    await axios.post(`${BASE_URL}/cnab/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    setMessage('processamento iniciado...');
  };

  return (
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
          type="button"
          disabled={!file?.name}
          className="bg-blue-800 px-3 py-2 rounded font-semibold hover:bg-blue-700 hover:cursor-pointer transition-colors disabled:bg-gray-700 disabled:cursor-not-allowed"
          onClick={uploadFile}
        >
          Enviar arquivo
        </button>
      </form>

      <div className="mt-2 text-green-600">
        <span>{message}</span>
      </div>
    </div>
  );
}
