import { Button } from "@cogoport/components";
import React from "react";
import styles from "./styles.module.css";
import { useState } from "react";
import CardItem from "./CardItem/index";
import { startCase } from "@cogoport/utils";
import getFormattedPrice from "../../../../commons/utils/getFormattedPrice";

interface ItemDataProps {
    expense_total_price: number;
    serial_id: string;
    pending_approvals: number;
    shipment_type: string;
    expense_count: number;
    expense_total_currency: string;
    urgency_expense_count: number;
    urgency_total_price: number;
    urgency_total_currency: string;
    income_count: number;
    credit_expense_count: number;
    credit_total_price: number;
    quotation_profit: string;
    tentative_profit: string;
    income_total_price: number;
    income_total_currency: string;
    id: string;
}
interface listData {
    itemData: ItemDataProps;
    currentOpenSID: string;
    setCurrentOpenSID: Function;
    refetch: any;
}
const AccordianCards = ({
    itemData,
    currentOpenSID,
    setCurrentOpenSID,
    refetch,
}: listData) => {
    const [amountTab, setAmountTab] = useState("expense");
    const handleClick = () => {
        setCurrentOpenSID("");
    };

    return (
        <div>
            <div className={styles.container}>
                <div className={styles.subContainer}>
                    <div className={styles.sid}>
                        <div className={styles.sidContainer}>
                            <div className={styles.sidLabelText}>SID - </div>
                            <div className={styles.sidValueText}>
                                {itemData.serial_id}
                            </div>
                        </div>
                        <div className={styles.pendingText}>
                            Pending Approval - {itemData.pending_approvals}
                        </div>
                    </div>

                    <div className={styles.freight}>
                        {startCase(itemData.shipment_type)}
                    </div>
                    <div className={styles.vr} />
                    <div className={styles.expenseAmount}>
                        <div className={styles.expense}>
                            <div className={styles.expenseLabelText}>
                                Expense ({itemData.expense_count || 0})
                            </div>
                            <div className={styles.expenseValueText}>
                                {getFormattedPrice(
                                    itemData.expense_total_price,
                                    itemData.expense_total_currency
                                )}
                            </div>
                        </div>
                        <div className={styles.urgent}>
                            <div className={styles.urgentLabelText}>
                                Urgent ({itemData.urgency_expense_count})
                            </div>
                            <div className={styles.urgentValueText}>
                                {getFormattedPrice(
                                    itemData.urgency_total_price,
                                    itemData.urgency_total_currency || "INR"
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={styles.expenseAmount}>
                        <div className={styles.expense}>
                            <div className={styles.expenseLabelText}>
                                Income ({itemData.income_count})
                            </div>
                            <div className={styles.expenseValueText}>
                                {getFormattedPrice(
                                    itemData.income_total_price,
                                    itemData.income_total_currency || "INR"
                                )}
                            </div>
                        </div>
                        <div className={styles.expense}>
                            <div className={styles.expenseLabelText}>
                                Credit Note ({itemData.credit_expense_count})
                            </div>
                            <div className={styles.expenseValueText}>
                                {getFormattedPrice(
                                    itemData.credit_total_price,
                                    "INR"
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={styles.vr} />
                    <div className={styles.expenseAmount}>
                        <div className={styles.expense}>
                            <div className={styles.profitibility}>
                                Quotation Profitability
                            </div>

                            <div className={styles.profitibilityValue}>
                                {itemData.quotation_profit}%
                            </div>
                        </div>

                        <div className={styles.expense}>
                            <div className={styles.profitibility}>
                                Tentative Profitability
                            </div>

                            <div className={styles.profitibilityValue}>
                                {itemData.tentative_profit} %
                            </div>
                        </div>
                    </div>
                    <div>
                        {currentOpenSID !== itemData?.id ? (
                            <Button
                                onClick={() => {
                                    setCurrentOpenSID(itemData?.id);
                                }}
                                themeType="secondary"
                            >
                                View More
                            </Button>
                        ) : (
                            <Button
                                themeType="secondary"
                                onClick={() => {
                                    setCurrentOpenSID(itemData?.id);
                                }}
                            >
                                Cost View
                            </Button>
                        )}
                    </div>
                    <div className={styles.ribben}>
                        <div className={styles.ribbon}>Closed</div>
                    </div>
                </div>

                <div>
                    {currentOpenSID === itemData?.id ? (
                        <CardItem
                            cardData={itemData}
                            currentOpenSID={currentOpenSID}
                            setCurrentOpenSID={setCurrentOpenSID}
                            refetch={refetch}
                            amountTab={amountTab}
                            setAmountTab={setAmountTab}
                        />
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default AccordianCards;
