import { Button } from "@cogoport/components";
import React from "react";
import styles from "./styles.module.css";
import { useState } from "react";
import CardHeader from "./CardHeader/index";
import CardItem from "./CardItem/index";
import useShipmentIdView from "../../../hook/useShipmentIdView";
import { startCase } from "@cogoport/utils";

interface listData {
    itemData: any;
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
    const [isAccordionActive, setIsAccordionActive] = useState(false);
    const [amountTab, setAmountTab] = useState("expense");
    const handleClick = () => {
        setIsAccordionActive(!isAccordionActive);
        // listApi();
    };

    return (
        <div>
            <div
                className={styles.container}
                style={{
                    transition: "max-height 0.2s ease-in-out",
                    maxHeight: isAccordionActive ? "100%" : "80px",
                }}
            >
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
                                {itemData.expense_total_currency}{" "}
                                {itemData.expense_total_price}
                            </div>
                        </div>
                        <div className={styles.urgent}>
                            <div className={styles.urgentLabelText}>
                                Urgent ({itemData.urgency_expense_count})
                            </div>
                            <div className={styles.urgentValueText}>
                                INR {itemData.urgency_total_price}
                            </div>
                        </div>
                    </div>
                    <div className={styles.expenseAmount}>
                        <div className={styles.expense}>
                            <div className={styles.expenseLabelText}>
                                Income ({itemData.income_count})
                            </div>
                            <div className={styles.expenseValueText}>
                                {itemData.income_total_currency}{" "}
                                {itemData.income_total_price}
                            </div>
                        </div>
                        <div className={styles.expense}>
                            <div className={styles.expenseLabelText}>
                                Credit Note ({itemData.credit_expense_count})
                            </div>
                            <div className={styles.expenseValueText}>
                                INR {itemData.credit_total_price}
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
                        {/* {!isAccordionActive ? (
                            <Button
                                themeType="secondary"
                                onClick={() => handleClick()}
                            >
                                View More
                            </Button>
                        ) : (
                            <Button>Cost View</Button>
                        )} */}

                        {currentOpenSID !== itemData?.id ? (
                            <Button
                                onClick={() => {
                                    setCurrentOpenSID(itemData?.id);
                                    setIsAccordionActive(!isAccordionActive);
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
                                    // setOpenModal(true);
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
                <div className={styles.hr} />
                <div className={styles.header}>
                    <CardHeader
                        itemData={itemData}
                        amountTab={amountTab}
                        setAmountTab={setAmountTab}
                    />
                </div>

                <div className={styles.cardList}>
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
                    {/* <CardItem /> */}
                </div>
                <div className={styles.footer}>
                    <div
                        className={styles.footerText}
                        onClick={() => handleClick()}
                    >
                        View Less
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccordianCards;
