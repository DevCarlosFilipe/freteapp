import { useEffect, useState } from "react";

const API_URL = "http://192.168.18.123/freteapp/backend/api/";

function useApi(params = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const method = String(params.method || "get").toLowerCase();
    const requestParams = Object.fromEntries(
        Object.entries(params).filter(([key]) => key !== "method")
    );
    const paramsKey = JSON.stringify(params);

    useEffect(() => {
        async function request() {
            setLoading(true);
            setError(null);
            setData(null);

            try {
                if (method !== "get" && method !== "post") {
                    throw new Error(`Método inválido: ${method}. Use get ou post.`);
                }

                const query = new URLSearchParams(requestParams);
                const url = method === "get" ? `${API_URL}?${query}` : API_URL;
                const requestOptions = {
                    method: method.toUpperCase()
                };

                if (method === "post") {
                    requestOptions.headers = {
                        "Content-Type": "application/x-www-form-urlencoded"
                    };
                    requestOptions.body = query;
                }

                const response = await fetch(url, requestOptions);

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const contentType = response.headers.get("content-type") || "";

                if (!contentType.includes("application/json")) {
                    const text = await response.text();
                    throw new Error(`Resposta inesperada do backend: ${text.slice(0, 150)}`);
                }

                const json = await response.json();
                setData(json);
            } catch (err) {
                setError(err.message || "Erro ao consultar a API.");
            } finally {
                setLoading(false);
            }
        }

        request();
    }, [paramsKey]);

    return {
        data,
        loading,
        error
    };
}

export default useApi;