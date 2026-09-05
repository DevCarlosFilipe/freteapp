import { useState } from "react"
import useApi from "../config/api"

const exemplos = [
    { label: "Teste simples", params: { action: "teste" } },
    { label: "Buscar cidades", params: { action: "cidades" } },
    { label: "Buscar entregas", params: { action: "entregas" } }
]

function Testes() {
    const [params, setParams] = useState({ action: "teste" })
    const { data, loading, error } = useApi(params)

    function handleSubmit(event) {
        event.preventDefault()
        setParams({ ...params })
    }

    function handleInputChange(key, value) {
        setParams((prev) => ({
            ...prev,
            [key]: value
        }))
    }

    function handleExample(example) {
        setParams(example.params)
    }

    return (
        <>
            <div style={{ padding: "2rem", maxWidth: "980px", margin: "0 auto", fontFamily: "sans-serif", background: "#fff" }}>
                <h1>Laboratório de JSON</h1>
                <p style={{ color: "#444" }}>
                    Essa página é um ambiente de testes para aprender como o frontend conversa com o backend e como ler os dados em JSON.
                </p>

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", margin: "1rem 0 1.5rem" }}>
                    {exemplos.map((item) => (
                        <button
                            key={item.label}
                            type="button"
                            onClick={() => handleExample(item)}
                            style={{
                                padding: "0.7rem 1rem",
                                border: "none",
                                borderRadius: "8px",
                                background: "#111827",
                                color: "#fff",
                                cursor: "pointer"
                            }}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem", marginBottom: "2rem" }}>
                    <label style={{ display: "grid", gap: "0.4rem" }}>
                        <span>Parâmetro action</span>
                        <input
                            value={params.action || ""}
                            onChange={(event) => handleInputChange("action", event.target.value)}
                            style={{ padding: "0.75rem", fontSize: "1rem", borderRadius: "8px", border: "1px solid #ccc" }}
                        />
                    </label>

                    <button
                        type="submit"
                        style={{
                            width: "fit-content",
                            padding: "0.8rem 1.2rem",
                            border: "none",
                            borderRadius: "8px",
                            background: "#2563eb",
                            color: "#fff",
                            cursor: "pointer",
                            fontWeight: "600"
                        }}
                    >
                        {loading ? "Enviando..." : "Enviar requisição"}
                    </button>
                </form>

                {loading && <p>Carregando dados do backend...</p>}

                {error && (
                    <div style={{ background: "#fee2e2", color: "#991b1b", padding: "1rem", borderRadius: "8px", marginBottom: "1rem" }}>
                        <strong>Erro:</strong> {error}
                    </div>
                )}

                {data && (
                    <div style={{ display: "grid", gap: "1rem" }}>
                        <div style={{ background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "1rem" }}>
                            <h2>Resposta em objeto</h2>
                            {Object.entries(data).map(([key, value]) => (
                                <p key={key} style={{ margin: "0.35rem 0" }}>
                                    <strong>{key}:</strong> {String(value)}
                                </p>
                            ))}
                        </div>

                        <div style={{ background: "#fff", color: "#111827", borderRadius: "12px", padding: "1rem", border: "1px solid #e2e8f0" }}>
                            <h2>JSON bruto</h2>
                            <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>{JSON.stringify(data, null, 2)}</pre>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Testes
