import { Pagination } from "@cogoport/components";
import React, { useState } from "react";
import SegmentedControl from "../../../commons/SegmentedControl/index";
import useShipmentIdView from "../../hook/useShipmentIdView";
import AccordianCards from "./AccordianCards/index";
import LoadingState from "./LoadingState/index";
import styles from "./styles.module.css";

interface ItemProps {
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

const ShipmentIdView = () => {
    const [currentOpenSID, setCurrentOpenSID] = useState("");
    const [pendingApproval, setPendingApproval] = useState("all");
    const [activeJobs, setActiveJobs] = useState("all");

    const {
        hookSetters,
        page,
        filters,
        loading,
        list: { total, data },
        refetch,
        statsData,
        statsLoading,
    } = useShipmentIdView({ pendingApproval, activeJobs });

    const options1 = [
        {
            label: "ALL",
            value: "all",
        },
        {
            label: "Pending Approval",
            value: "pendingApproval",
        },
        {
            label: "Not Pending Approval",
            value: "notPendingApproval",
        },
    ];
    const options2 = [
        {
            label: "ALL",
            value: "all",
        },
        {
            label: "Open Jobs",
            value: "openJobs",
        },
        {
            label: "Operationally Closed",
            value: "operationallyClosed",
        },
        {
            label: "Closed Jobs",
            value: "closedJobs",
        },
    ];

    return (
        <div>
            <div className={styles.toggle}>
                <SegmentedControl
                    options={options1}
                    activeTab={pendingApproval}
                    setActiveTab={setPendingApproval}
                />

                <SegmentedControl
                    options={options2}
                    activeTab={activeJobs}
                    setActiveTab={setActiveJobs}
                />
            </div>

            <div>
                {loading && (
                    <div style={{ marginTop: "50px" }}>
                        {[1, 2, 3, 4, 5, 6, 7].map(() => {
                            return <LoadingState />;
                        })}
                    </div>
                )}
                {data?.map((item: ItemProps) => (
                    <>
                        {loading ? (
                            <LoadingState />
                        ) : (
                            <AccordianCards
                                itemData={item}
                                currentOpenSID={currentOpenSID}
                                setCurrentOpenSID={setCurrentOpenSID}
                                key={item?.id}
                                refetch={refetch}
                            />
                        )}
                    </>
                ))}
                <div className={styles.pagination}>
                    <Pagination
                        currentPage={page}
                        handlePageChange={(val: number) =>
                            hookSetters.setFilters({
                                ...filters,
                                page: val,
                            })
                        }
                        totalItems={total}
                        pageSize={10}
                        type="table"
                    />
                </div>
            </div>
        </div>
    );
};

export default ShipmentIdView;
