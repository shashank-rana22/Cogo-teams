import React, { useState } from "react";
import { Button, Pill } from "@cogoport/components";
import { useRouter } from "@cogoport/next";
import styles from "./styles.module.css";
import StatRect from "./StatRect";
import Line from "./Line";
import DiscountRect from "./DiscountRect";
import { Accordion } from "@cogoport/components";
import { startCase } from "@cogoport/utils";
import { IcADocumentTemplates, IcMArrowNext } from "@cogoport/icons-react";
import { Placeholder } from "@cogoport/components";
import CardHeader from "./Card/CardHeader";
import { CardBody } from "./Card/CardBody";
import useGetShipmentCostSheet from "../hook/useGetShipmentCostSheet";
import { GenericObject } from "../../commons/Interfaces";
import getFormattedPrice from "../../commons/utils/getFormattedPrice";
import Documents from "../All_Invoices/ViewInvoices/ShipmentDetails/Documents";
import useListShipment from "../hook/useListShipment";
import Details from "../All_Invoices/ViewInvoices/ShipmentDetails/Details";
import useUpdateJob from "../hook/useUpdateJob";
import useGetWallet from "../hook/useGetWallet";
const CostSheet = () => {
  const [showButton, setShowButton] = useState(false);
  const [showFinal, setShowFinal] = useState(false);
  const Router = useRouter();
  const { query } = Router || {};
  const { shipmentId: shipment_id, jobNumber, orgId } = query || {};
  const {
    selldata,
    buydata,
    apiloading,
    preTaxData,
    postTaxData,
    preTaxLoading,
    postTaxLoading,
    sellData,
    buyData,
  } = useGetShipmentCostSheet({ query });
  const { tentativeProfit: preTaxActual, quotationalProfit: preTaxExpected } =
    preTaxData || {};
  const { tentativeProfit: postTaxActual, quotationalProfit: postTaxExpected } =
    postTaxData || {};
  const { data: shipmentData } = useListShipment(jobNumber);
  const dataList = shipmentData?.list[0] || {};
  const { source, trade_type } = dataList;
  const shipmentId = dataList?.id || "";
  const sourceText =
    source === "direct" ? "Sell Without Buy" : startCase(source);
  const { data: dataWallet, loading: loadingWallet } = useGetWallet(shipmentId);
  const { agent_data, agent_role_data, amount, amount_currency } =
    dataWallet?.list?.[0] || {};
  const { totalActual: buyTotal } = buyData || {};
  const { totalActual: sellTotal } = sellData || {};
  const { getData, getFinalData, FinalLoading, loading } = useUpdateJob({
    query,
    setShowButton,
    setShowFinal,
    showFinal,
    showButton,
  });
  const handleOperationalClose = (e: any) => {
    const data = e.target.innerText;
    getData(data);
  };

  return (
    <div>
      <div className={styles.flex}>
        <Button
          size="md"
          themeType="secondary"
          onClick={() =>
            Router.push(
              "/business-finance/coe-finance/[active_tab]/[view]",
              "/business-finance/coe-finance/all_invoices/shipment-view" as never as null
            )
          }
        >
          Go Back
        </Button>
        <div className={styles.flexwidth}>
          {showButton ? (
            <>
              <div>Status - </div>
              <div className={styles.tag}>Operationally Closed</div>
              <div
                className={styles.link}
                onClick={(e) => handleOperationalClose(e)}
              >
                Undo
              </div>
            </>
          ) : (
            <Button
              size="md"
              themeType="primary"
              disabled={loading}
              onClick={(e) => handleOperationalClose(e)}
            >
              Close Operationally
            </Button>
          )}

          <Button
            size="md"
            themeType="primary"
            disabled={!showButton || FinalLoading || showFinal}
            onClick={() => {
              getFinalData();
            }}
          >
            {showFinal ? "Financially Closed" : "Close Financially"}
          </Button>
        </div>
      </div>
      <Line margin="20px 0px 0px 0px" />
      <div className={styles.heading}>Profitability</div>
      <Line width="60px" color="#F68B21" margin="5px 0px 0px 0px" />
      <div className={styles.statscontainer}>
        <StatRect
          heading="Profit on Shipment - Pre Tax"
          expected={preTaxExpected}
          actual={preTaxActual}
          loading={preTaxLoading}
        />
        <StatRect
          heading="Profit on Shipment - Post Tax"
          expected={postTaxExpected}
          actual={postTaxActual}
          loading={postTaxLoading}
        />
      </div>
      <DiscountRect
        heading="Discount Applied"
        statvalue={
          dataWallet?.list?.[0] && (
            <div className={styles.discountData}>
              <div className={styles.kamData}>KAM -</div>
              <div>
                {agent_data?.name}&nbsp;({agent_role_data?.name})
              </div>
              <div className={styles.kamData}>Wallet Usage - </div>
              <div>
                {amount_currency || "USD"} {amount || 0}
              </div>
            </div>
          )
        }
        statlabel="Revenue Desk - "
      />
      <Accordion
        type="text"
        title={
          (
            <span className={styles.label}>
              Documents
              <span className={styles.icon}>
                <IcADocumentTemplates />
              </span>
            </span>
          ) as unknown as string
        }
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "8px",
          margin: "25px 0px",
        }}
      >
        <Documents shipmentId={shipment_id} />
      </Accordion>
      <Accordion
        type="text"
        title={
          (
            <span className={styles.details}>
              Shipment Details
              <div className={styles.tagsContainer}>
                <Pill color="blue">{sourceText}</Pill>
                <Pill color="yellow">{startCase(trade_type)}</Pill>
              </div>
            </span>
          ) as unknown as string
        }
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "8px",
          margin: "25px 0px",
        }}
      >
        <Details
          orgId={orgId}
          dataList={shipmentData?.list?.[0]}
          shipmentId={shipment_id}
        />
      </Accordion>
      <div className={styles.heading}>Cost Sheet</div>
      <Line width="60px" color="#F68B21" margin="5px 0px 0px 0px" />
      <div className={styles.flexresponsive}>
        <div className={styles.displayflex}>
          <DiscountRect
            heading={<span className={styles.legends}>Legends</span>}
            statlabel={
              <span className={styles.displayflex}>
                Profit{" "}
                <span className={styles.profiticon}>
                  <IcMArrowNext height={20} width={20} />
                </span>
              </span>
            }
            statvalue={
              <span className={styles.displayflex}>
                Loss{" "}
                <span className={styles.lossicon}>
                  <IcMArrowNext height={20} width={20} />
                </span>
              </span>
            }
            marginTop="15px"
            width="320px"
            headingwidth="90px"
          />
          {/* <div className={styles.warning}><span className={styles.icon}><IcMInfo height={20} width={20}/></span>Check Incidental Charge</div> */}
        </div>
      </div>
      <div className={styles.flex}>
        <div className={styles.width}>
          <CardHeader
            header="Sell"
            value={getFormattedPrice(sellTotal, "INR") || "-"}
            loading={apiloading}
          />
          <div className={styles.quotationAmount}>
            Quotation Total :
            <div className={styles.valueText}>
              {sellData?.totalQuotational
                ? getFormattedPrice(sellData?.totalQuotational, "INR")
                : "  --" || "-"}
            </div>
          </div>
          {apiloading &&
            [1, 2, 3, 4].map(() => (
              <Placeholder margin="20px" width="96%" height="220px" />
            ))}
          {!apiloading &&
            selldata.map((charge: GenericObject) => (
              <CardBody charge={charge} type="sell" />
            ))}
        </div>
        <div className={styles.width}>
          <CardHeader
            header="Buy"
            value={getFormattedPrice(buyTotal, "INR") || "-"}
            loading={apiloading}
          />
          <div className={styles.quotationAmount}>
            Quotation Total :
            <div className={styles.valueText}>
              {buyData?.totalQuotational
                ? getFormattedPrice(buyData?.totalQuotational, "INR")
                : "  --" || "-"}
            </div>
          </div>
          {apiloading &&
            [1, 2, 3, 4].map(() => (
              <Placeholder margin="20px" width="96%" height="220px" />
            ))}
          {!apiloading &&
            buydata.map((charge: GenericObject) => (
              <CardBody charge={charge} type="buy" />
            ))}
        </div>
      </div>
    </div>
  );
};
export default CostSheet;
