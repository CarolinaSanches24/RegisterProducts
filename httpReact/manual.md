#### Create Project React+Vite

```
npm create vite@latest
```

#### Install json-server

```
npm install json-server --save-dev
```

### Run project

```
npm run server
```

#### scripts package.json

"server": "json-server --watch  data/db.json"


### Hooks

- useEffect - Ação executada uma única vez .

Exemplo de uso 



### UI Chakra

[https://v2.chakra-ui.com/getting-started/vite-guide]

```
import React, { useEffect } from 'react';

function MeuComponente() {
  useEffect(() => {
    document.title = 'Novo Título da Página';
  }, []); // a lista vazia [] significa "faça isso apenas uma vez, quando o componente aparecer"

  return <div>Olá, mundo!</div>;
}

export default MeuComponente;
```

- useState - é uma ferramenta do React que te ajuda a criar e gerenciar esses pedaços de informação mutável (estado) dentro dos componentes.

```
function Contador() {
  // Declaramos uma variável de estado chamada 'contador', com valor inicial de 0
  const [contador, setContador] = useState(0);

  return (
    <div>
      <p>Você clicou {contador} vezes</p>
      <button onClick={() => setContador(contador + 1)}>
        Clique aqui
      </button>
    </div>
  );
}

export default Contador;
````

