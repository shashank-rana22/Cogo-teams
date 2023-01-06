import React from "react";
import styles from "./styles.module.css";

interface itemTypes {
    status?: string;
}

interface propsType {
    item: itemTypes;
    field: any;
}

const Status = ({ item, field }: propsType) => {
    const { status }: itemTypes = item;
    return (
        <div>
            <div>
                {status === "FINANCE_ACCEPTED" && (
                    <div className={styles.financeAccepted}>
                        Finance Accepted
                    </div>
                )}
                {status === "INITIATED" && (
                    <div className={styles.initiated}>Initiated</div>
                )}
                {status === "ACCEPTED" && (
                    <div className={styles.accepted}>Accepted</div>
                )}
                {status === "financeRejected" && (
                    <div className={styles.StatusFinanceRejected}>
                        Finance Rejected
                    </div>
                )}
                {status === "POSTED" && (
                    <div className={styles.posted}>Posted</div>
                )}
                {status === "VOID" && <div className={styles.void}>Void</div>}
                {status === "COE_REJECTED" && (
                    <div className={styles.coeRejected}>COE Rejected</div>
                )}
            </div>
        </div>
    );
};

export default Status;
