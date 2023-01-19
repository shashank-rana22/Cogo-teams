import React from "react";
import { format } from "@cogoport/utils";
import { IcMInfo } from "@cogoport/icons-react";
import { Tooltip } from "@cogoport/components";
import styled from "./styles.module.css";
import getFormattedPrice from "../../../../../commons/utils/getFormattedPrice";
import showOverflowingNumber from "../../../../../commons/showOverflowingNumber";

interface itemProps {
    createdDate: Date;
    billDate: Date;
    dueDate: Date;
    billCurrency?: string;
    subTotal?: number;
    grandTotal?: number;
}
interface Props {
    item: itemProps;
    field: {
        key: string;
    };
}

function FormatedDate({ item, field }: Props) {
     const getCreatedDate = format(
        item?.createdDate,
        "dd/MMM/yyyy  hh:mm a",
        null,
        false
    );
    const getBillDate = format(item?.billDate, "dd/MMM/yyyy", null, false);
    const getDueDate = format(item?.dueDate, "dd/MMM/yyyy", null, false);

    const content = (
        <>
            <div className={styled.preTax}>
                Pre Tax :
                <text className={styled.preTaxAmount}>
                    {getFormattedPrice(item.subTotal!, item.billCurrency!)}
                </text>
            </div>
            <div className={styled.postTax}>
                Post Tax:
                <text className={styled.postTaxAmount}>
                    {getFormattedPrice(item.grandTotal!, item.billCurrency!)}
                </text>
            </div>
        </>
    );
    const formatAmount =
        getFormattedPrice(item.grandTotal!, item.billCurrency!) || "";
    return (
        <div>
            {field?.key === "createdDate" && <div>{getCreatedDate}</div>}
           {field?.key === "billDate" && <div>{getBillDate}</div>}
           {field?.key === "dueDate" && <div>{getDueDate}</div>} 
            {field?.key === "grandTotal" && (
                <div className={styled.invoiceAmount}>
                    <text>{showOverflowingNumber(formatAmount, 12)}</text>

                    <Tooltip placement="top" content={content}>
                        <div className={styled.IcMinIcon}>
                            <IcMInfo width="16px" height="16px" />
                        </div>
                    </Tooltip>
                </div>
            )}
        </div>
    );
}

export default FormatedDate;
