import styles from "./Table.module.css";

function Table({ columns, data, caption }) {
    return (
        <table className={styles.table}>
            {caption && (
                <caption className={styles.caption}>{caption}</caption>
            )}
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column.key}>{column.header}</th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={row.id ?? rowIndex}>
                        {columns.map((column) => (
                            <td key={column.key}>
                                {column.render ? column.render(row) : row[column.key]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;