import React from "react";
import { format } from "@cogoport/utils";
import { formatDate } from "../../../../../../../commons/utils/formatDate";

interface itemTypes {
    billDate: Date;
    dueDate: Date;
    invoiceDate: Date;
    createdDate: Date;
}

interface propsType {
    item: itemTypes;
    field: any;
}

const FormatedDate = ({ item, field }: propsType) => {
    const getBillDate = formatDate(item.billDate, "dd/MMM/yyyy");
    const getDueDate = formatDate(item.dueDate, "dd/MMM/yyyy");
    const getInvoiceDate = formatDate(item.invoiceDate, "dd/MMM/yyyy");
    const getLastModifiedDate = formatDate(
        item.createdDate,
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
