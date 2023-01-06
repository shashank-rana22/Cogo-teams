import React from "react";
import styles from "./styles.module.css";
interface itemTypes {
    billDocumentUrl?: string;
    billNumber?: string;
    invoicePdfUrl?: string;
    proformaPdfUrl?: string;
    invoiceNumber?: string;
    proformaNumber?: string;
}

interface propsType {
    item: itemTypes;
    field: any;
}

const InvoiceNumber = ({ item, field }: propsType) => {
    const handleBillType = (type: any) => {
        let invoiceType = "PURCHASE INVOICE";

        if (type?.billType === "CREDIT_NOTE") {
            invoiceType = "CREDIT NOTE";
        } else if (type?.isProforma) {
            invoiceType = "PROFORMA INVOICE";
        }
        return invoiceType;
    };

    return (
        <div>
            {field.key === "billNumber" && (
                <>
                    <div
                        className={styles.invoice}
                        onClick={() =>
                            window.open(item.billDocumentUrl, "_blank")
                        }
                    >
                        {item?.billNumber}
                    </div>
                    <div className={styles.color}>{handleBillType(item)}</div>
                </>
            )}
            {field.key === "invoiceNumber" && (
                <div
                    className={styles.invoice}
                    onClick={() =>
                        window.open(
                            item.invoicePdfUrl || item.proformaPdfUrl,
                            "_blank"
                        )
                    }
                >
                    {item.invoiceNumber || item.proformaNumber}
                </div>
            )}
        </div>
    );
};

export default InvoiceNumber;
