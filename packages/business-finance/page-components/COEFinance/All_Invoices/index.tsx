import React, { useEffect, useState } from "react";
import PurchaseInvoice from "./PurchaseInvoiceView/index";
import styles from "./styles.module.css";
import ShipmentIdView from "./ShipmentIdView/index";
import { useRouter } from "@cogoport/next";

const AllInvoices = () => {
  const [filters, setFilters] = useState({});
  const { push, query } = useRouter();
  const [subActiveTab, setSubActiveTab] = useState(
    query.view || "purchase-view"
  );

  const isPurchase = subActiveTab === "purchase-view";

  useEffect(() => {
    push(
      "/business-finance/coe-finance/[active_tab]/[view]",
      `/business-finance/coe-finance/all_invoices/${subActiveTab}` as never as null
    );
  }, [subActiveTab]);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.flex}>
          <div
            onClick={() => {
              setSubActiveTab("purchase-view");
            }}
          >
            <div
              className={
                isPurchase ? styles.sub_container_click : styles.sub_container
              }
            >
              PURCHASE INVOICE VIEW
            </div>
          </div>
          <div
            onClick={() => {
              setSubActiveTab("shipment-view");
            }}
          >
            <div
              className={
                !isPurchase ? styles.sub_container_click : styles.sub_container
              }
            >
              SHIPMENT ID VIEW
            </div>
          </div>
        </div>
      </div>
      {isPurchase && (
        <PurchaseInvoice filters={filters} setFilters={setFilters} />
      )}
      {!isPurchase && <ShipmentIdView />}
    </div>
  );
};
export default AllInvoices;
