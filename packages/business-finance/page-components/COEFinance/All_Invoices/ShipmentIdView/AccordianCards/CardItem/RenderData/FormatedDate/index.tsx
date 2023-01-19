import React from "react";
import styles from './styles.module.css';
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
    const getBillDate = formatDate(item.billDate, "dd/MMM/yyyy",{},true);
    const getDueDate = formatDate(item.dueDate, "dd/MMM/yyyy",{},true);
    const getInvoiceDate = formatDate(item.invoiceDate, "dd/MMM/yyyy",{},true);
    const getLastModifiedDate = formatDate(
        item.createdDate,
        "dd/MMM/yyyy hh:mm:ss",{},true
    );

    return (
        <div className={styles.text}>
            {field?.key === "billDate" && <div>{getBillDate}</div>}
            {field?.key === "dueDate" && <div>{getDueDate}</div>}
            {field?.key === "invoiceDate" && <div> {getInvoiceDate}</div>}
            {field?.key === "createdDate" && <div>{getLastModifiedDate} </div>}
        </div>
    );
};

export default FormatedDate;
