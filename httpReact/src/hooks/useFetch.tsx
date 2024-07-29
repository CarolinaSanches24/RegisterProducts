import { useEffect, useState } from "react";
import { Product } from "../entity/product";

type ConfigData = Record<string, unknown>;

type Method = "POST" | "GET" | "PUT" | "DELETE";

type FetchConfig = {
    method: Method;
    headers: {
        "Content-Type": string;
    };
    body?: string;
} | null;

export const useFetch = (url: string) => {
    const [data, setData] = useState<Product[] | null>(null);
    const [config, setConfig] = useState<FetchConfig>(null);
    const [method, setMethod] = useState<Method | null>(null);
    const [callFetch, setCallFetch] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [itemId, setItemId] = useState(null);

    const httpConfig = async (data: ConfigData, method: Method) => {
        if (method === "POST") {
            setConfig({
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            setMethod(method);
            setCallFetch(true);
        }else if(method==="DELETE"){
            setConfig({
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                
            });
            setMethod(method);
            setItemId(data);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(url);
                const json = await res.json();
                setData(json);

                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            } catch (error) {
                setError("Houve algum erro ao carregar dados");
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [url, callFetch]);

    useEffect(() => {
        const httpRequest = async () => {
            if (method === "POST" && config) {
                try {
                    const res = await fetch(url, config);
                    const json = await res.json();
                    return json;
                } catch (error) {
                    console.error("Error making POST request:", error);
                } finally {
                    setCallFetch(false);
                }
            }else if(method==="DELETE"){
                const deleteUrl = `${url}/${itemId}`;
                const res = await fetch(deleteUrl, config);
        };

        if (method === "POST" && config) {
            httpRequest();
        }
    }, [config, method, url]);

    return { data, httpConfig, loading, error };
};
