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
    const [itemId, setItemId] = useState<number | null>(null);

    const httpConfig = async (data: ConfigData | number, method: Method) => {
        if (method === "POST") {
            setConfig({
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
        } else if (method === "DELETE") {
            setConfig({
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            setItemId(data as unknown as number);
        }
        setMethod(method);
        setCallFetch(true);
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
            if (!method || !config) return;

            try {
                let res;
                if (method === "DELETE" && itemId !== null) {
                    const deleteUrl = `${url}/${itemId}`;
                    res = await fetch(deleteUrl, config);
                } else {
                    res = await fetch(url, config);
                }

                const json = await res.json();
                setData(json);
            } catch (error) {
                console.error(`Error making ${method} request:`, error);
            } finally {
                setCallFetch(false);
            }
        };

        if (callFetch) {
            httpRequest();
        }
    }, [config, method, url, callFetch, itemId]);

    return { data, httpConfig, loading, error };
};