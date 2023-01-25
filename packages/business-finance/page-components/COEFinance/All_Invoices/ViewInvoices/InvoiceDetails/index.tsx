import React, { useState } from "react";
import { Button, Tooltip, Modal } from "@cogoport/components";
import styles from "./styles.module.css";
import { isEmpty, startCase } from "@cogoport/utils";
import { IcMInfo } from "@cogoport/icons-react";
import { urgencyOptions } from "./controls";
import AddUrgencyTag from "./AddUrgencyTag/index";
import RemoveTagConfirmation from "./RemoveTagConfirmation/index";
import { useRouter } from "@cogoport/next";
import { Pill } from "@cogoport/components";
interface BillInterFace {
  grandTotal?: string;
  id?: string;
}
interface BillAdditionalObject {
  collectionPartyId?: string;
  urgencyTag?: string;
  urgencyRemarks?: string;
}
interface RemarkObj {
  remarks?: string;
}
interface DataProps {
  bill?: BillInterFace;
  billAdditionalObject?: BillAdditionalObject;
  remarks?: Array<RemarkObj>;
  serviceType?: string;
}
interface Props {
  data?: DataProps;
  getBillRefetch: () => void;
}
const InvoiceDetails = ({ data = {}, getBillRefetch }: Props) => {
  const [remark, setRemark] = useState("");
  const { bill, remarks = [] } = data;
  const collectionPartyId = data?.billAdditionalObject?.collectionPartyId;
  const { grandTotal } = bill || {};
  const [removeTag, setRemoveTag] = useState(false);
  const [showAddTag, setShowAddTag] = useState(false);
  const [tagValue, setTagValue] = useState("");
  const { query } = useRouter();
  const { billType, isProforma } = query;

  if (data?.serviceType === "air_freight") {
    urgencyOptions.push({ label: "Airlines DO Payments", value: "air_do" });
  }
  let invoiceType = startCase(billType);

  if (billType === "BILL") {
    if (isProforma === true) {
      invoiceType = "PROFORMA INVOICE";
    } else {
      invoiceType = "PURCHASE INVOICE";
    }
  }

  let displayTag = "";
  urgencyOptions.forEach((option) => {
    if (option.value === data?.billAdditionalObject?.urgencyTag)
      displayTag = option.label;
  });

  const remarkRender = () => {
    return (
      <div>Urgent Remarks - {data?.billAdditionalObject?.urgencyRemarks}</div>
    );
  };

  const renderEditTag = (
    <div className={styles.flexdiv}>
      <div className={styles.cardField}>
        <div className={styles.tags}>
          {displayTag}
          <div>{remark}</div>
        </div>

        {!isEmpty(data?.billAdditionalObject?.urgencyRemarks) &&
        data?.billAdditionalObject?.urgencyTag === "urgent" ? (
          <Tooltip placement="bottom" interactive content={remarkRender()}>
            <IcMInfo />
          </Tooltip>
        ) : null}
      </div>

      <div className={styles.buttonContainer}>
        <Button
          themeType="secondary"
          size="md"
          onClick={() => setRemoveTag(true)}
        >
          Remove Tag
        </Button>

        <Button
          themeType="secondary"
          size="md"
          onClick={() => setShowAddTag(true)}
        >
          Edit Tag
        </Button>
      </div>
    </div>
  );

  const renderEmpty = (
    <div className={styles.flexdiv}>
      <div>No Urgency Tag &nbsp;</div>
      <Button
        themeType="secondary"
        size="md"
        onClick={() => setShowAddTag(true)}
      >
        Add Tag
      </Button>
    </div>
  );

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <div className={styles.details}>Invoice Details</div>
        <Pill color="blue">{invoiceType}</Pill>
      </div>

      {showAddTag ? (
        <AddUrgencyTag
          remark={remark}
          setRemark={setRemark}
          billId={data?.bill?.id}
          serviceType={data?.serviceType}
          showAddTag={showAddTag}
          tagValue={tagValue}
          setTagValue={setTagValue}
          getBillRefetch={getBillRefetch}
          setShowAddTag={setShowAddTag}
          collectionPartyId={collectionPartyId}
        />
      ) : null}
      <div className={styles.smallHr} />
      <div className={styles.card}>
        <div className={styles.cardFieldFirst}>
          Invoice Amount - &nbsp;{" "}
          <span className={styles.amount}>INR {grandTotal}</span>
        </div>
        <div className={styles.verticalSmallHr} />
        <div className={styles.cardFieldSecond}>
          Tag - &nbsp;{" "}
          <span className={styles.tag}>
            {data?.billAdditionalObject?.urgencyTag
              ? renderEditTag
              : !isEmpty(data) && renderEmpty}
          </span>
        </div>
        <div className={styles.verticalSmallHr} />
        <div className={styles.cardFieldThird}>
          Remarks -{" "}
          <span className={styles.remarks}>
            {remarks?.[0]?.remarks || "No Remarks"}
          </span>
        </div>
      </div>

      {removeTag ? (
        <Modal
          show={removeTag}
          onClose={() => setRemoveTag(false)}
          className="secondary sm"
        >
          <RemoveTagConfirmation
            setRemoveTag={setRemoveTag}
            getBillRefetch={getBillRefetch}
            billId={data?.bill?.id}
            collectionPartyId={collectionPartyId}
          />
        </Modal>
      ) : null}
    </div>
  );
};

export default InvoiceDetails;
