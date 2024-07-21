import React, { useState } from 'react';
import { VStack, HStack, Input, Button, Text } from '@chakra-ui/react';
import './App.css'; 
import { Product } from './entity/product';
import { useFetch } from './hooks/useFetch'; 

const url = "http://localhost:3000/products";

function App() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const { data: items = [], httpConfig } = useFetch(url);

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newProduct= {
      id:items ? items.length + 1 : 1,
      name,
      price: parseFloat(price)
    };

    httpConfig(newProduct, "POST");

    setName("");
    setPrice("");
  };

  return (
    <VStack spacing={4} padding={8} align="stretch" className='App'>
      <Text fontSize="2xl">Lista de Produtos</Text>
      <VStack align="stretch">
        {items && items.length > 0 ? (
          items.map((product: Product) => (
            <Text key={product.id}>{product.name} - R$: {product.price}</Text>
          ))
        ) : (
          <Text>Nenhum produto encontrado</Text>
        )}
      </VStack>
      <VStack align="stretch" className='add-product'>
        <form onSubmit={handleSubmit}>
          <HStack>
            <Input type="text" value={name} name="name" onChange={(e) => setName(e.target.value)} placeholder="Nome do Produto" />
            <Input type="number" value={price} name="price" onChange={(e) => setPrice(e.target.value)} placeholder="Preço do Produto" />
            <Button type="submit" colorScheme="blue">Criar</Button>
          </HStack>
        </form>
      </VStack>
    </VStack>
  );
}

export default App;
