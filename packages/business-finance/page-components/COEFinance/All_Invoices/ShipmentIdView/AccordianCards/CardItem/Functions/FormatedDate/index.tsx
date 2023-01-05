import React from "react";
import { format } from "@cogoport/utils";

interface itemTypes {
    billDate?: string;
    dueDate?: string;
    invoiceDate?: string;
    createdDate?: string;
}

interface propsType {
    item: itemTypes;
    field: any;
}

const FormatedDate = ({ item, field }: propsType) => {
    const getBillDate = format(item?.billDate, "dd/MMM/yyyy");
    const getDueDate = format(item?.dueDate, "dd/MMM/yyyy");
    const getInvoiceDate = format(item?.invoiceDate, "dd/MMM/yyyy");
    const getLastModifiedDate = format(
        item?.createdDate,
        "dd/MMM/yyyy hh:mm:ss"
    );

    return (
        <div>
            {field?.key === "billDate" && <div>{getBillDate}</div>}
            {field?.key === "dueDate" && <div>{getDueDate}</div>}
            {field?.key === "invoiceDate" && <div> {getInvoiceDate}</div>}
            {field?.key === "createdDate" && <div>{getLastModifiedDate} </div>}
        </div>
    );
};

export default FormatedDate;
