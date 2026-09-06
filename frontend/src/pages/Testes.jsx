import useAPI from "../hooks/api"
import styles from "../styles/Testes.module.css"

function Testes() {
    const { data, loading, error } = useAPI({
        action: "auth.login", 
        email: "teste@email.com", 
        senha: "123456",
        method: "get"
    })

    if (loading) return <div className={styles.container}>Loading...</div>
    if (error) return <div className={styles.container}>Error: {error.message}</div>

    return (
        <div className={styles.container}>
            <h1>Testes</h1>
            <p>{data.message}</p>

            <h3>Dados da API</h3>
            <pre style={{ whiteSpace: "pre-wrap", margin: 0 }}>{JSON.stringify(data, null, 2)}</pre>
        </div>
    )
}

export default Testes
