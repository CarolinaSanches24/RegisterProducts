import { useEffect, useState } from "react";

type ConfigData = Record<string, unknown>;

type Method = "POST" | "GET" | "PUT" | "DELETE";

type FetchConfig = {
    method: Method;
    headers: {
        "Content-Type": string;
    };
    body: string;
} | null;

export const useFetch = (url:string) => {
    const [data, setData] = useState<null>(null);
    const [config, setConfig] = useState<FetchConfig>(null);
    const [method, setMethod] = useState<Method | null>(null);
    const [callFetch, setCallFetch] = useState(false);
    
    const httpConfig = (data:ConfigData, method:Method) => {
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
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                setData(json);
            } catch (error) {
                console.error("Error fetching data:", error);
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
                    setData(json);
                } catch (error) {
                    console.error("Error making POST request:", error);
                } finally {
                    setCallFetch(false);
                }
            }
        };

        httpRequest();
    }, [config, method, url]);

    return { data, httpConfig };
};
