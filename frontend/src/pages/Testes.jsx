import useAPI from "../config/api"

function Testes() {
    const { data, loading, error } = useAPI({ action: "teste7", msg: "palavras de teste", method: "post" })

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error.message}</div>

    return (
        <div style={{ background: "#fff", padding: "2rem", maxWidth: "980px", margin: "0 auto", fontFamily: "sans-serif" }}>
            <h1>Testes</h1>
            <p>{data.tt}</p>

            <h3>Dados da API</h3>
            <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}

export default Testes
