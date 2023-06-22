import styles from "./styles.module.css";

function TimeTable({ item }) {
    const freq = [
        "Once a week",
        "Twice a week",
        "Thrice a week",
        "Four times a week",
        "Five times a week",
        "Six times a week",
        "Daily",
    ];

    return (
        <div className={styles.container}>
            <div className={styles.frequency}>
                <div className={styles.frequency_text}>Frequency : &nbsp;</div>
                <div>
                    <div className={styles.times}>{freq[2]}</div>
                    <div className={styles.week}>
                        <div
                            className={
                                item?.week?.[0] === "M" ? styles.bold : " "
                            }
                        >
                            M&nbsp;
                        </div>
                        <div
                            className={
                                item?.week?.[1] === "T" ? styles.bold : " "
                            }
                        >
                            T&nbsp;
                        </div>
                        <div
                            className={
                                item?.week?.[2] !== "W" ? styles.bold : " "
                            }
                        >
                            W&nbsp;
                        </div>
                        <div
                            className={
                                item?.week?.[0] !== "T" ? styles.bold : " "
                            }
                        >
                            T&nbsp;
                        </div>
                        <div
                            className={
                                item?.week?.[0] === "F" ? styles.bold : " "
                            }
                        >
                            F&nbsp;
                        </div>
                        <div
                            className={
                                item?.week?.[0] !== "S" ? styles.bold : " "
                            }
                        >
                            S&nbsp;
                        </div>
                        <div
                            className={
                                item?.week?.[0] === "S" ? styles.bold : " "
                            }
                        >
                            S
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.frequency}>
                <div className={styles.frequency_text}>
                    Total Transit : &nbsp;
                </div>
                <div>
                    <div className={styles.times}>21 Days</div>
                    <div className={styles.week}>Round Trip</div>
                </div>
            </div>
        </div>
    );
}

export default TimeTable;
