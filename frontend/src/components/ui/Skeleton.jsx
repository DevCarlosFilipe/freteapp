import styles from "./Skeleton.module.css";

function Skeleton({
    width = "100%",
    height = "1rem",
    tone = "light",
    circle = false,
    className = ""
}) {
    return (
        <span
            className={`${styles.skeleton} ${tone === "dark" ? styles.dark : ""} ${circle ? styles.circle : ""} ${className}`.trim()}
            style={{ width, height }}
            aria-hidden="true"
        />
    );
}

export default Skeleton;
