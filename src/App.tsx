import { useState } from 'react';
import axios from 'axios';
import './App.css';

interface City {
  id: number;
  nome: string;
}

function App() {
  const [selectedState, setSelectedState] = useState('');
  const [cities, setCities] = useState<City[]>([]);
  
  const handleStateChange = (event: { target: { value: any; }; }) => {
    const state = event.target.value;
    setSelectedState(state);

    // Faz a requisição para obter as cidades do estado selecionado
    axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`)
      .then((response) => {
        setCities(response.data);
      })
      .catch((error) => {
        console.error('Erro ao buscar as cidades:', error);
      });
  };

  return (
    <>
      <label htmlFor="states">Estado: </label>
      <select name="states" id="states" value={selectedState} onChange={handleStateChange}>
        <option value="">Selecione um Estado</option>
        <option value="AC">AC</option>
        <option value="AL">AL</option>
        <option value="AP">AP</option>
        <option value="AM">AM</option>
        <option value="BA">BA</option>
        <option value="CE">CE</option>
        <option value="ES">ES</option>
        <option value="GO">GO</option>
        <option value="MA">MA</option>
        <option value="MT">MT</option>
        <option value="MS">MS</option>
        <option value="MG">MG</option>
        <option value="PA">PA</option>
        <option value="PB">PB</option>
        <option value="PR">PR</option>
        <option value="PE">PE</option>
        <option value="PI">PI</option>
        <option value="RJ">RJ</option>
        <option value="RN">RN</option>
        <option value="RS">RS</option>
        <option value="RO">RO</option>
        <option value="RR">RR</option>
        <option value="SC">SC</option>
        <option value="SP">SP</option>
        <option value="SE">SE</option>
        <option value="TO">TO</option>
        <option value="DF">DF</option>
      </select>
      <br/>
      <label htmlFor="cities">Cidade: </label>
      <select name="cities" id="cities" disabled={!selectedState} >
        <option value="">Selecione uma Cidade</option>
        {cities.map((city) => (
          <option key={city.nome} value={city.nome}>
            {city.nome}
          </option>
        ))}
      </select>
    </>
  );
}

export default App;
