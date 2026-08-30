import Header from "../components/header/Header"
import styles from "../styles/HowWork.module.css"
import { fetchApi } from "../config/api"

import { useEffect, useState } from "react"

function HowWork() {

    const [data, setData] = useState(null);

    useEffect(() => {
        fetchApi()
            .then(response => response.json())
            .then(data => setData(data))
            .catch(() => setData({ success: false, message: "API indisponível" }));
    }, []);

    return (
        <>
            <Header />
            <div className={styles.howWork}>
                <h1>Como funciona</h1>

                {data && (
                    <>
                        <p>{data.message}</p>
                        <p>{data.tt}</p>
                    </>
                )}
            </div>
        </>
    );
}

export default HowWork