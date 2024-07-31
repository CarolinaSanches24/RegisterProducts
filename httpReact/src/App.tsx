import React, { useState, useEffect } from "react";
import { VStack, HStack, Input, Button, Text, Spinner } from "@chakra-ui/react";
import "./App.css";
import { Product } from "./entity/product";
import { useFetch } from "./hooks/useFetch";
import { getImageUrl } from "./utils";

const url = "http://localhost:3000/products";

function App() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const { data: items = [], httpConfig, loading, error } = useFetch(url);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (items) {
      setProducts(items);
    }
  }, [items]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newProduct = {
      id: products.length + 1,
      name,
      price: parseFloat(price),
    };

    httpConfig(newProduct, "POST");

    setName("");
    setPrice("");
  };

  const handleRemove = (id: number) => {
    httpConfig(id, "DELETE");
  };

  return (
    <VStack spacing={4} padding={8} align="stretch" className="App">
      <Text fontSize="2xl">Lista de Produtos</Text>
      {loading && (
        <HStack>
          <Text>Carregando dados...</Text>
          <Spinner
            thickness="2px"
            speed="1.5s"
            emptyColor="gray.200"
            color="blue.500"
            size="md"
          />
        </HStack>
      )}
      {error && <p>{error}</p>}
      {!loading && (
        <VStack align="stretch">
          {products.length > 0 ? (
            products.map((product: Product) => (
              <HStack key={product.id}>
                <Text>
                  {product.name} - R$: {product.price}
                </Text>
                <Button
                  onClick={() => handleRemove(product.id as number)}
                  type="submit"
                  colorScheme="red"
                  name="delete"
                  size="sm" //tamanho pequeno
                  p={2} // Adicionar padding
                >
                  <img
                    src={getImageUrl("icon/delete.svg")}
                    alt="Remover produto"
                    style={{ width: "25px", height: "25px" }}
                  />
                </Button>
              </HStack>
            ))
          ) : (
            <Text>Nenhum produto encontrado</Text>
          )}
        </VStack>
      )}
      <VStack align="stretch" className="add-product">
        <form onSubmit={handleSubmit}>
          <HStack>
            <Input
              type="text"
              value={name}
              name="name"
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome do Produto"
            />
            <Input
              type="number"
              value={price}
              name="price"
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Preço do Produto"
            />
            {loading ? (
              <Button type="submit" disabled value="Aguarde" colorScheme="blue">
                Criar
              </Button>
            ) : (
              <Button type="submit" colorScheme="blue">
                Criar
              </Button>
            )}
          </HStack>
        </form>
      </VStack>
    </VStack>
  );
}

export default App;