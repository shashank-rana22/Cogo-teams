import { Input } from "@cogoport/components";
import { Pagination } from "@cogoport/components";
import React, { useEffect, useState } from "react";
import SegmentedControl from "../../../commons/SegmentedControl/index";
import useShipmentIdView from "../../hook/useShipmentIdView";
import AccordianCards from "./AccordianCards/index";
import LoadingState from "./LoadingState/index";
import styles from "./styles.module.css";
import { IcMSearchdark } from "@cogoport/icons-react";
import { SelectController } from "@cogoport/forms";
import controls from "./Filters/controls";
import Filter from "../../../commons/Filters";
import Filters from "./Filters";

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
    } = useShipmentIdView({});

    return (
        <div>
            <Filters hookSetters={hookSetters} filters={filters} />

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
                {data.length > 0 ? (
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
                ) : (
                    <div className={styles.noData}>No Data Available</div>
                )}
            </div>
        </div>
    );
};

export default ShipmentIdView;
