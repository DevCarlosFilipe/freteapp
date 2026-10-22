import { useState } from "react";
import styles from "./Table.module.css";
import TableNoData from "./TableNoData";
import TablePagination from "./TablePagination";

function Table({ columns, data, caption, limit = 10 }) {
    const [currentPage, setCurrentPage] = useState(1);

    if (!data || data.length === 0) {
        return <TableNoData />;
    }

    const shouldPaginate = Number.isFinite(limit) && limit > 0 && data.length > limit;
    const totalPages = shouldPaginate ? Math.ceil(data.length / limit) : 1;
    const page = Math.min(currentPage, totalPages);
    const startIndex = shouldPaginate ? (page - 1) * limit : 0;
    const displayedData = shouldPaginate
        ? data.slice(startIndex, startIndex + limit)
        : data;

    return (
        <>
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
                    {displayedData.map((row, rowIndex) => (
                        <tr key={row.id ?? startIndex + rowIndex}>
                            {columns.map((column) => (
                                <td key={column.key}>
                                    {column.render ? column.render(row) : row[column.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            {shouldPaginate && (
                <TablePagination
                    currentPage={page}
                    totalPages={totalPages}
                    handlePageChange={setCurrentPage}
                />
            )}
        </>
    );
}

export default Table;