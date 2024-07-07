import React, { useEffect, useState } from 'react';
import { VStack, HStack, Input, Button, Text } from '@chakra-ui/react';
import './App.css'; 
import { Product } from './entity/product';

const url = "http://localhost:3000/products";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error('Erro ao carregar os dados');
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const product = {
      name,
      price
    };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product)
      });

      if (!res.ok) {
        throw new Error('Erro ao adicionar o produto');
      }

      const addedProduct = await res.json();

      setProducts((prevProducts) => [...prevProducts, addedProduct]);
      setName("");
      setPrice("");
    } catch (error) {
      console.error("Erro ao adicionar o produto:", error);
    }
  };

  return (
    <VStack spacing={4} padding={8} align="stretch" className='App'>
      <Text fontSize="2xl">Lista de Produtos</Text>
      <VStack align="stretch">
        {products.length > 0 ? (
          products.map((product) => (
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
