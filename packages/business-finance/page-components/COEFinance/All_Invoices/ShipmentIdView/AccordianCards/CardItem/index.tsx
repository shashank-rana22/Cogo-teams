import { Button } from "@cogoport/components";
import React from "react";
import List from "../../../../../commons/List/index";
import useListBills from "../../../../hook/useListBills";
import CardHeader from "../CardHeader/index";
import AmountWithCurrency from "./Functions/AmountWithCurrency/index";
import FormatedDate from "./Functions/FormatedDate/index";
import InvoiceNumber from "./Functions/InvoiceNumber/index";
import ModifiedName from "./Functions/ModifiedName/index";
import Remarks from "./Functions/Remarks/index";
import Status from "./Functions/Status/index";
import ViewInvoice from "./Functions/ViewInvoice/index";
import styles from "./styles.module.css";

interface propsType {
    cardData: any;
    currentOpenSID: string;
    setCurrentOpenSID: Function;
    refetch: Function;
    amountTab: string;
    setAmountTab: Function;
}

interface fullResponseProps {
    totalRecords?: number;
    pageIndex?: number;
    list?: object[];
}

const CardItem = ({
    cardData,
    currentOpenSID,
    setCurrentOpenSID,
    refetch,
    amountTab,
    setAmountTab,
}: propsType) => {
    const {
        loading,
        hookSetters,
        filters,
        list: { fullResponse },
        config,
    } = useListBills({
        serial_id: cardData?.serial_id,
        amountTab,
        currentOpenSID,
    });

    const handleClick = () => {
        setCurrentOpenSID("");
    };

    const { totalRecords, pageIndex, list }: fullResponseProps =
        fullResponse || {};

    const functions = {
        renderInvoiceNumber: (item: any, field: any) => (
            <InvoiceNumber item={item} field={field} />
        ),
        renderDates: (item: any, field: any) => (
            <FormatedDate item={item} field={field} />
        ),
        renderName: (item: any, field: any) => (
            <ModifiedName item={item} field={field} />
        ),
        renderAmount: (item: any, field: any) => (
            <AmountWithCurrency item={item} field={field} />
        ),
        renderStatus: (item: any, field: any) => (
            <Status item={item} field={field} />
        ),
        renderInvoices: (item: any, field: any) => <ViewInvoice />,
        renderRemarks: (item: any) => <Remarks item={item} />,
    };

    return (
        <div>
            <div className={styles.hr} />
            <div className={styles.header}>
                <CardHeader
                    itemData={cardData}
                    amountTab={amountTab}
                    setAmountTab={setAmountTab}
                />
            </div>

            <div className={styles.cardList}>
                {list?.length === 0 ? (
                    <div className={styles.noData}>No Data Available</div>
                ) : (
                    <List
                        config={config}
                        itemData={fullResponse}
                        functions={functions}
                        loading={loading}
                        page={pageIndex}
                        pageSize={totalRecords}
                    />
                )}
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
    );
};

export default CardItem;
