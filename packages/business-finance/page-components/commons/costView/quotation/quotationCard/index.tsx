import React from "react";
import getFormattedPrice from "../../../../commons/utils/getFormattedPrice";
import styles from "./styles.module.css";

interface LineItems {
    name?: string;
    code?: string;
    tax_total_price_discounted?: number;
    tax_total_price?: number;
    currency?: string;
    actual_price?: number;
    actual_price_currency?: string;
}

interface ServiceCharge {
    service_type?: string;
    id?: string;
    line_items?: Array<LineItems>;
}

interface Quotation {
    service_charges?: Array<ServiceCharge>;
    actual_total_price?: number;
    actual_total_price_currency?: string;
    net_total_price_discounted?: number;
    net_total_price_currency?: string;
}

function QuotationCard(quotation: any, isBuyQuotation: boolean) {
    const {
        actual_total_price: actualTotalPrice = 0,
        actual_total_price_currency: actualTotalPriceCurrency = "",
        net_total_price_discounted: netTotalPriceDiscounted = 0,
        net_total_price_currency: netTotalPriceCurrency = "",
        service_charges: serviceCharge = [],
    }: Quotation = quotation || {};

    const showPrice = (price: number, currency: string) =>
        getFormattedPrice(price, currency, {
            currencyDisplay: "symbol",
        });

    return (
        <div className={styles.container}>
            <div className={styles.headerText}>
                {isBuyQuotation ? "BUY" : "SELL"}
            </div>

            <div className={styles.subContainer}>
                <div className={styles.flex} />
                <div className={styles.expected}>Expected</div>
                <div className={styles.actual}>Actual</div>
            </div>

            {serviceCharge.map(
                ({ service_type = "", id = "", line_items = [] }) => (
                    <div key={id}>
                        <div className={styles.mainContainer}>
                            <div className={styles.flex}>
                                <b
                                    style={{
                                        color: "#333333",
                                        fontSize: "20px",
                                    }}
                                >
                                    {service_type}
                                </b>
                            </div>
                        </div>
                        <div className={styles.headerHR} />

                        {line_items.map((serviceItem: LineItems) => {
                            const {
                                name = "",
                                code = "",
                                tax_total_price_discounted:
                                    taxTotalPriceDiscounted = 0,
                                tax_total_price: taxTotalPrice = 0,
                                currency = "",
                                actual_price: actualPrice = 0,
                                actual_price_currency: actualPriceCurrency = "",
                            } = serviceItem || {};

                            return (
                                <div
                                    className={styles.mainContainer}
                                    key={code}
                                    style={{ padding: "10px 0px" }}
                                >
                                    <div className={styles.flex}>{name}</div>

                                    <div className={styles.customFlex}>
                                        {showPrice(
                                            taxTotalPriceDiscounted ||
                                                taxTotalPrice,
                                            currency || "INR"
                                        )}
                                    </div>

                                    <div className={styles.customFlex}>
                                        {showPrice(
                                            actualPrice,
                                            actualPriceCurrency || "INR"
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )
            )}
            <div className={styles.br} />

            <div>
                <div className={styles.flex}>
                    <div style={{ color: "#333333" }}>TOTAL COST</div>
                </div>

                <div className={styles.showPriceContainer}>
                    <div
                        style={{
                            marginRight: "5px",
                        }}
                    >
                        {showPrice(
                            netTotalPriceDiscounted,
                            netTotalPriceCurrency || "INR"
                        )}
                    </div>
                </div>

                <div className={styles.showPriceContainer}>
                    <div>
                        {showPrice(
                            actualTotalPrice,
                            actualTotalPriceCurrency || "INR"
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuotationCard;
