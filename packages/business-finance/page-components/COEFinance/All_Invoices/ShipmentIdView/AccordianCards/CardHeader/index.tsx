import React, { useState } from "react";
import TabSelect from "../../../../../commons/TabSelect/index";
import getFormattedPrice from "../../../../../commons/utils/getFormattedPrice";
import styles from "./styles.module.css";

interface propsType {
    itemData: any;
    amountTab: string;
    setAmountTab: Function;
}

const CardHeader = ({ amountTab, setAmountTab, itemData }: propsType) => {
    const options = [
        { name: "Expense", value: "expense" },
        { name: "Income", value: "income" },
    ];
    return (
        <div className={styles.container}>
            <div className={styles.amount}>
                <div className={styles.toggle}>
                    <TabSelect
                        options={options}
                        value={amountTab}
                        setValue={setAmountTab}
                    />
                </div>
                <div className={styles.discount}>
                    <div className={styles.labelText}>
                        Discount Applied (KAM) -
                    </div>
                    <div className={styles.valueText}>
                        {getFormattedPrice(
                            itemData.discount_amount,
                            itemData.discount_amount_currency
                        )}
                    </div>
                </div>
                <div className={styles.discount}>
                    <div className={styles.labelText}>
                        Discount Applied (Revenue Desk) -
                    </div>
                    <div className={styles.valueText}> {} </div>
                </div>
            </div>
            <div className={styles.status}>
                <div className={styles.statusLabel}>Status - </div>
                <div className={styles.statusValue}>N/A</div>
            </div>
        </div>
    );
};

export default CardHeader;
