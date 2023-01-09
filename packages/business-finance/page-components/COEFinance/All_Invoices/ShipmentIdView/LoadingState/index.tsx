import React from "react";
import styles from "./styles.module.css";
import { Placeholder } from "@cogoport/components";
const LoadingState = () => {
    return (
        <div className={styles.mainContainer}>
            <div className={styles.container}>
                <div className={styles.flexRow}>
                    <div className={styles.percent}>
                        <Placeholder />
                        <Placeholder />
                    </div>
                </div>
                <div className={styles.details}>
                    <Placeholder />
                </div>

                <div className={styles.flexRow}>
                    <div className={styles.percent}>
                        <Placeholder />
                        <Placeholder />
                    </div>
                </div>
                <div className={styles.flexRow}>
                    <div className={styles.percent}>
                        <Placeholder />
                        <Placeholder />
                    </div>
                </div>

                <div className={styles.flexRow}>
                    <div className={styles.percent}>
                        <Placeholder />
                        <Placeholder />
                    </div>
                </div>
                <div className={styles.button}>
                    <Placeholder />
                </div>
            </div>
        </div>
    );
};

export default LoadingState;
