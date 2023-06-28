import styles from "./styles.module.css";

function Toggler({ data }) {
    return (
        <>
            {data?.[0]?.source === "manual" ? (
                <div className={styles.manual_container}>Manual Upload</div>
            ) : (
                <div className={styles.system_container}>System Upload</div>
            )}
        </>
    );
}

export default Toggler;
