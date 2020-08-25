import React, { useState, useEffect } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function loadData() {
      const response = await api.get('/repositories');

      const loadedRepositories = response.data; //Passar os dados da requisição

      setRepositories(loadedRepositories);
    }
    loadData(); //Chamar a função
  }, []);

  async function handleAddRepository() {
    // ADICIONAR REPOSITORIOS ESTATICAMENTE
    const newRepository = {
      title: `New Repositorie ${Date.now()}`,
      url: 'localhost:3333',
      techs: ['NodeJS', 'React'],
    };
    const response = await api.post('/repositories', newRepository);

    const addedRespositories = response.data;
    //Primeiro verificar se houve exito na requuisição
    if (response.status === 200) {
      setRepositories([...repositories, addedRespositories]);
    }
  }

  async function handleRemoveRepository(id) {
    // REMOVER O REPOSITORIO CLICADO
    const response = await api.delete(`/repositories/${id}`);

    if (response.status === 204) {
      //retirar o repositorio apagado do array
      const currentRepositories = repositories.filter(
        (repository) => repository.id !== id,
      );
      //Adicionar os repositorios sem o repositorio eliminado.
      setRepositories(currentRepositories);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
