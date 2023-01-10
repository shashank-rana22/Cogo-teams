import { Pagination } from "@cogoport/components";
import React, { useState } from "react";
import useShipmentIdView from "../../hook/useShipmentIdView";
import AccordianCards from "./AccordianCards/index";
import LoadingState from "./LoadingState/index";
import styles from "./styles.module.css";
import Filters from "./Filters";

export interface ItemDataProps {
    organizationId?:string
    jobType?:string
    jobSource?:string
    jobNumber?:string
    expense_total_price?: number;
    serial_id?: string;
    pending_approvals?: number;
    shipment_type?: string;
    expense_count?: number;
    expense_total_currency?: string;
    urgency_expense_count?: number;
    urgency_total_price?: number;
    urgency_total_currency?: string;
    income_count?: number;
    credit_expense_count?: number;
    credit_total_price?: number;
    quotation_profit?: string;
    tentative_profit?: string;
    income_total_price?: number;
    income_total_currency?: string;
    id?: string;
    is_job_closed?: boolean;
}

const ShipmentIdView = () => {
    const [currentOpenSID, setCurrentOpenSID] = useState("");
    const [pending_approval, setPending_approval] = useState("all");
    const [jobs, setJobs] = useState("all");
    const {
        hookSetters,
        page,
        filters,
        loading,
        list: { total, data },
        refetch,
    } = useShipmentIdView({ jobs, pending_approval });

    return (
        <div>
            <Filters
                hookSetters={hookSetters}
                filters={filters}
                pending_approval={pending_approval}
                setPending_approval={setPending_approval}
                jobs={jobs}
                setJobs={setJobs}
            />

            <div>
                {loading && (
                    <div style={{ marginTop: "10px" }}>
                        {[1, 2, 3, 4, 5].map(() => {
                            return <LoadingState />;
                        })}
                    </div>
                )}
                {data?.map((item: ItemDataProps) => (
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
                ) : null}
            </div>
        </div>
    );
};

export default ShipmentIdView;
