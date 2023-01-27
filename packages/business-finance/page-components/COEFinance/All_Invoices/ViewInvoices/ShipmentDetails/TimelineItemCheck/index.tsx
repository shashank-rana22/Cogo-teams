import { IcMFtick } from "@cogoport/icons-react";
import React, { useState } from "react";

import styles from "./styles.module.css";

interface TimeLine {
  itemCheck?: boolean;
  lineItem?: boolean;
  status: string;
}
function TimeLineItemCheck({ itemCheck, lineItem, status }: TimeLine) {
  const isInvoiceApproved = status === "FINANCE_ACCEPTED";
  return (
    <div>
      <div className={styles.container}>
        {itemCheck || isInvoiceApproved ? (
          <IcMFtick color="red" height={40} width={40} />
        ) : (
          <div className={styles.dull} />
        )}

        <div className={styles.line} />
        {lineItem || isInvoiceApproved ? (
          <IcMFtick color="red" height={40} width={40} />
        ) : (
          <div className={styles.dull} />
        )}
      </div>
      <div className={styles.container}>
        <div className={styles.textContainer}>Invoice Details</div>
        <div>Line item check</div>
      </div>
    </div>
  );
}
export default TimeLineItemCheck;
