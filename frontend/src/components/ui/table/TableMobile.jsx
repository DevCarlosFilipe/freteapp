import { useState } from "react";
import styles from "./Table.module.css";
import TableNoData from "./TableNoData";
import TablePagination from "./TablePagination";

function TableMobile({ columns, data, caption, limit = 10 }) {
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
        <div className={styles.mobileTable}>
            {caption && <p className={styles.mobileCaption}>{caption}</p>}
            <div className={styles.mobileRows}>
                {displayedData.map((row, rowIndex) => (
                    <article
                        className={styles.mobileRow}
                        key={row.id ?? startIndex + rowIndex}
                    >
                        {columns.map((column) => (
                            <div className={styles.mobileCell} key={column.key}>
                                <span className={styles.mobileLabel}>{column.header}</span>
                                <span className={styles.mobileValue}>
                                    {column.render ? column.render(row) : row[column.key]}
                                </span>
                            </div>
                        ))} 
                    </article>
                ))}
            </div>
            {shouldPaginate && (
                <TablePagination
                    currentPage={page}
                    totalPages={totalPages}
                    handlePageChange={setCurrentPage}
                />
            )}
        </div>
    );
}

export default TableMobile;
