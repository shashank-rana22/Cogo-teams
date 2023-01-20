import React, { useState } from "react";
import { startCase } from "@cogoport/utils";
import { Pill } from "@cogoport/components";
import styles from "./styles.module.css";
import {
  IcMArrowRotateDown,
  IcMArrowRotateUp,
  IcADocumentTemplates,
} from "@cogoport/icons-react";
import Details from "./Details/index";
import Documents from "./Documents/index";
import ShipmentDetailsCard from "./ShipmentDetailsCard/index";
import PdfDisplay from "./PdfDisplay/index";
import POC from "./POC/index";
import useListShipment from "../../../hook/useListShipment";
import useGetVariance from "../../../hook/useGetVariance";
import VarianceView from "./VarianceView/index";
import { RemarksValInterface } from "../../../../commons/Interfaces/index";
import TimeLineItemCheck from "./TimelineItemCheck/index";
import useGetWallet from "../../../hook/useGetWallet";

interface BuyerDetailInterface {
  entityCode?: string;
  organizationName?: string;
  address?: string;
  registrationNumber?: string;
  taxNumber?: string;
}

interface SellerDetailInterface {
  organizationName?: string;
  registrationNumber?: string;
  taxNumber?: string;
}

interface SellerBankDetailInterface {
  bankName?: string;
  accountNumber?: string;
  ifscCode?: string;
}

interface BillInterface {
  id?: string;
  billDocumentUrl?: string;
  billNumber?: string;
  billDate?: string;
  status?: string;
  placeOfSupply?: string;
  taxTotal: any;
  billCurrency: string;
  grandTotal: any;
  subTotal: string | number;
}
interface JobInterface {
  jobNumber: string;
}

interface BillAdditionalObjectInterface {
  collectionPartyId: string;
}
export interface DataInterface {
  job?: JobInterface;
  lineItems: Array<object>;
  billAdditionalObject?: BillAdditionalObjectInterface;
  buyerDetail?: BuyerDetailInterface;
  sellerBankDetail?: SellerBankDetailInterface;
  sellerDetail?: SellerDetailInterface;
  bill?: BillInterface;
}

interface ShipmentDetailsInterface {
  data: DataInterface;
  orgId: string;
  jobNumber?: string;
  remarksVal: RemarksValInterface;
  setRemarksVal: any;
  lineItemsRemarks: object;
  setLineItemsRemarks: React.Dispatch<React.SetStateAction<{}>>;
  setLineItem: React.Dispatch<React.SetStateAction<boolean>>;
  lineItem?: boolean;
  status: string;
}
const ShipmentDetails = ({
  data,
  orgId,
  jobNumber,
  remarksVal,
  setRemarksVal,
  lineItemsRemarks,
  setLineItemsRemarks,
  setLineItem,
  lineItem,
  status,
}: ShipmentDetailsInterface) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [showVariance, setShowVariance] = useState(false);
  const [itemCheck, setItemCheck] = useState(false);
  const collectionPartyId = data?.billAdditionalObject?.collectionPartyId;
  const { varianceFullData, loading } = useGetVariance({ collectionPartyId });
  const { data: shipmentData } = useListShipment(jobNumber);
  const dataList = shipmentData?.list[0] || {};
  const { source, trade_type } = dataList;
  const shipmentId = dataList?.id || "";
  const sourceText =
    source === "direct" ? "Sell Without Buy" : startCase(source);
  const { data: dataWallet, loading: loadingWallet } = useGetWallet(shipmentId);
  const { agent_data, agent_role_data, amount, amount_currency } =
    dataWallet?.list?.[0] || {};

  return (
    <div className={styles.container}>
      <h3>Shipment Details</h3>

      <div className={styles.smallHr} />

      <div className={styles.card}>
        <div
          className={styles.cardUpper}
          onClick={() => {
            setShowDetails(!showDetails);
          }}
        >
          <div className={styles.subContainer}>
            Details
            <div className={styles.tagsContainer}>
              <Pill color="blue">{sourceText}</Pill>
              <Pill color="yellow">{startCase(trade_type)}</Pill>
            </div>
            {dataWallet?.list?.[0] && (
              <div className={styles.Data}>
                <div className={styles.kamData}>KAM -</div>
                <div>
                  {agent_data?.name}&nbsp;({agent_role_data?.name})
                </div>
                <div className={styles.kamData}>Wallet Usage - </div>
                <div>
                  {amount_currency || "USD"} {amount || 0}
                </div>
              </div>
            )}
          </div>

          <div
            className={styles.caret}
            onClick={() => {
              setShowDetails(!showDetails);
            }}
          >
            {showDetails ? (
              <IcMArrowRotateUp height="17px" width="17px" />
            ) : (
              <IcMArrowRotateDown height="17px" width="17px" />
            )}
          </div>
        </div>
        {showDetails && <div className={styles.hr} />}
        <div className={styles.details}>
          {showDetails && (
            <Details
              orgId={orgId}
              dataList={dataList}
              shipmentId={shipmentId}
            />
          )}
        </div>
      </div>

      <div
        className={styles.card}
        onClick={() => {
          setShowDocuments(!showDocuments);
        }}
      >
        <div className={styles.cardUpper}>
          <div className={styles.subContainer}>
            Documents
            <IcADocumentTemplates height="17px" width="17px" />
          </div>

          <div
            className={styles.caret}
            onClick={() => {
              setShowDocuments(!showDocuments);
            }}
          >
            {showDocuments ? (
              <IcMArrowRotateUp height="17px" width="17px" />
            ) : (
              <IcMArrowRotateDown height="17px" width="17px" />
            )}
          </div>
        </div>
        {showDocuments && <div className={styles.hr} />}
        <div className={styles.documents}>
          {showDocuments && <Documents shipmentId={shipmentId} />}{" "}
        </div>
      </div>

      <div>
        {collectionPartyId ? (
          <div className={styles.variance}>
            <div>
              VARIANCE -
              {loading
                ? "Getting......"
                : `${varianceFullData?.currency || "--"}${" "}
					${varianceFullData?.total_variance || "--"}`}
            </div>
            <div
              className={styles.viewMore}
              onClick={() => setShowVariance(true)}
            >
              View More
            </div>
          </div>
        ) : null}
        <POC itemData={data} />
      </div>

      {showVariance ? (
        <VarianceView
          show={showVariance}
          loading={loading}
          onClose={() => setShowVariance(false)}
          data={varianceFullData?.data}
          currency={varianceFullData?.currency}
        />
      ) : null}

      <TimeLineItemCheck
        itemCheck={itemCheck}
        lineItem={lineItem}
        status={status}
      />

      <div className={styles.shipmentDetailsFooter}>
        <div className={styles.pdfDisplay}>
          <PdfDisplay data={data} />
        </div>
        <div className={styles.shipmentDetailsCard}>
          <ShipmentDetailsCard
            data={data}
            remarksVal={remarksVal}
            setRemarksVal={setRemarksVal}
            lineItemsRemarks={lineItemsRemarks}
            setLineItemsRemarks={setLineItemsRemarks}
            setItemCheck={setItemCheck}
            setLineItem={setLineItem}
            invoiceStatus={status}
          />
        </div>
      </div>
    </div>
  );
};
export default ShipmentDetails;
