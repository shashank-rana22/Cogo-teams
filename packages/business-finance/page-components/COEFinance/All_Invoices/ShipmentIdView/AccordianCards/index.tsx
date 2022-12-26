import { Button, Tags } from "@cogoport/components";
import React from "react";
import styles from "./styles.module.css";
import { useState } from "react";
import CardHeader from "./CardHeader/index";
import CardItem from "./CardItem/index";
import useShipmentIdView from "../../../hook/useShipmentIdView";
const AccordianCards = () => {
    const [isAccordionActive, setIsAccordionActive] = useState(false);
    const handleClick = () => {
        setIsAccordionActive(!isAccordionActive);
        // listApi();
    };

    const { data } = useShipmentIdView();
    console.log(data, "data");

    return (
        <div>
            {/* <h1>Cards</h1> */}
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
                            <div className={styles.sidValueText}>112680</div>
                        </div>
                        <div className={styles.pendingText}>
                            Pending Approval - 3
                        </div>
                    </div>

                    <div className={styles.freight}>Fcl_freight</div>
                    <div className={styles.vr} />
                    <div className={styles.expenseAmount}>
                        <div className={styles.expense}>
                            <div className={styles.expenseLabelText}>
                                Expense (3)
                            </div>
                            <div className={styles.expenseValueText}>
                                INR 20,340,403.12
                            </div>
                        </div>
                        <div className={styles.urgent}>
                            <div className={styles.urgentLabelText}>
                                Urgent (0)
                            </div>
                            <div className={styles.urgentValueText}>INR 0</div>
                        </div>
                    </div>
                    <div className={styles.expenseAmount}>
                        <div className={styles.expense}>
                            <div className={styles.expenseLabelText}>
                                Income (2)
                            </div>
                            <div className={styles.expenseValueText}>
                                INR 21,50,403.12
                            </div>
                        </div>
                        <div className={styles.expense}>
                            <div className={styles.expenseLabelText}>
                                Credit Note (0)
                            </div>
                            <div className={styles.expenseValueText}>
                                INR 20
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
                                6.90 %
                            </div>
                        </div>

                        <div className={styles.expense}>
                            <div className={styles.profitibility}>
                                Tentative Profitability
                            </div>

                            <div className={styles.profitibilityValue}>
                                4.40 %
                            </div>
                        </div>
                    </div>
                    <div>
                        {!isAccordionActive ? (
                            <Button
                                themeType="secondary"
                                onClick={() => handleClick()}
                            >
                                View More
                            </Button>
                        ) : (
                            <Button>Cost View</Button>
                        )}
                    </div>
                    <div className={styles.ribben}>
                        <div className={styles.ribbon}>Closed</div>
                    </div>
                </div>
                <div className={styles.hr} />
                <div className={styles.header}>
                    <CardHeader />
                </div>
                <div className={styles.cardList}>
                    <CardItem />
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
