import React from "react";
import getFormattedPrice from "../../../../../../../commons/utils/getFormattedPrice";

interface itemTypes {
    grandTotal: number;
    billCurrency?: string;
    currency?: string;
}

interface propsType {
    item: itemTypes;
    field: any;
}

const AmountWithCurrency = ({ item, field }: propsType) => {
    const { grandTotal, billCurrency, currency } = item;
    return (
        <div>
            <div>
                {field?.key === "grandTotal" && (
                    <div>
                        {getFormattedPrice(
                            grandTotal,
                            billCurrency || currency || "INR"
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AmountWithCurrency;
