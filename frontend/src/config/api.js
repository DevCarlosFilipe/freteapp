import { useEffect, useState } from "react";

const API_URL = "http://192.168.18.123/freteapp/backend/API/";

function useApi(params = {}) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function request() {
            setLoading(true);
            setError(null);
            setData(null);

            try {
                const query = new URLSearchParams(params);
                const url = `${API_URL}?${query}`;

                const response = await fetch(url);

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
    }, [params]);

    return {
        data,
        loading,
        error
    };
}

export default useApi;