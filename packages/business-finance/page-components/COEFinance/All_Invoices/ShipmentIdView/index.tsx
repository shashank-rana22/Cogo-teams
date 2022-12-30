import { Pagination } from "@cogoport/components";
import React, { useState } from "react";
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

    const {
        hookSetters,
        page,
        filters,
        loading,
        list: { total, data },
        refetch,
        statsData,
        statsLoading,
    } = useShipmentIdView();

    return (
        <div>
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
