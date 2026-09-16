import { useEffect, useState } from "react";

const API_HOST = typeof window !== "undefined"
    ? window.location.hostname
    : "192.168.18.123";

const API_URL = `http://${API_HOST}/freteapp/backend/api/`;

function useApi(params = {}) {
    const enabled = params.enabled !== false;
    const onSuccess = params.onSuccess;

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(enabled);
    const [error, setError] = useState(null);
    const [requestVersion, setRequestVersion] = useState(0);

    const method = String(params.method || "get").toLowerCase();
    const paramsKey = JSON.stringify(params);

    useEffect(() => {
        if (!enabled) {
            return;
        }

        async function request() {
            const requestParams = Object.fromEntries(
                Object.entries(JSON.parse(paramsKey)).filter(
                    ([key]) => !["method", "enabled", "requestVersion", "onSuccess"].includes(key)
                )
            );

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
                    method: method.toUpperCase(),
                    credentials: "include"
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

                if (onSuccess) {
                    onSuccess(json);
                }
            } catch (err) {
                setError(err.message || "Erro ao consultar a API.");
            } finally {
                setLoading(false);
            }
        }

        request();
    }, [enabled, method, onSuccess, paramsKey, requestVersion]);

    return {
        data,
        loading,
        error,
        refetch: () => setRequestVersion((version) => version + 1)
    };
}

export default useApi;