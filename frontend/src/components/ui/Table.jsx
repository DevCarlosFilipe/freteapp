import styles from "./Table.module.css";

function Table({ columns, data, caption }) {
    return (
        <table className={styles.table}>
            {caption && (
                <caption className={styles.caption}>{caption}</caption>
            )}
            <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index}>{column}</th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columns.map((column, colIndex) => (
                            <td key={colIndex}>{row[column]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;