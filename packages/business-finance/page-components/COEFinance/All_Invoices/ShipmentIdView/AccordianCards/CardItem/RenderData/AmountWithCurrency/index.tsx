import React from "react";
import showOverflowingNumber from "../../../../../../../commons/showOverflowingNumber";
import getFormattedPrice from "../../../../../../../commons/utils/getFormattedPrice";

interface itemTypes {
    grandTotal?: number;
    billCurrency?: string;
    currency?: string;
}

interface propsType {
    item: itemTypes;
    field?: any;
}

const AmountWithCurrency = ({ item, field }: propsType) => {
    const { grandTotal, billCurrency, currency }: itemTypes = item;

    const formatAmount =
        getFormattedPrice(
            item.grandTotal!,
            item.billCurrency! || currency || "INR"
        ) || "";
    return (
        <div>
            <div>
                {field.key === "grandTotal" && (
                    <div>
                        <text>{showOverflowingNumber(formatAmount, 12)}</text>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AmountWithCurrency;
