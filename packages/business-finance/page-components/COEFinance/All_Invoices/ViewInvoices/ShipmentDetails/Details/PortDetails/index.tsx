import React from "react";
import { isEmpty, startCase } from "@cogoport/utils";
import getLocations from "../../../../../../../utils/getLocationConfig";
import GetServiceInfo from "../../../../../../commons/GetServiceInfo";
import { formatDate } from "../../../../../../commons/utils/formatDate";
import { IcMPortArrow } from "@cogoport/icons-react";
import { DetailInterface } from "../../../../../../commons/Interfaces/index";
import styles from "./styles.module.css";

interface Props {
  data: DetailInterface;
  showDate?: boolean;
}

const PortDetails = ({ data, showDate = false }: Props) => {
  if (isEmpty(data)) {
    return null;
  }

  const { origin_main_port = "", destination_main_port = "" } = data || {};

  const { origin, destination } =
    getLocations({ ...data, search_type: data?.shipment_type }) || {};

  const serviceIcon = GetServiceInfo(data?.shipment_type);

  const handleLocationDetails = (location, icdInfo) => {
    return (
      <>
        <div className={styles.PortCode}>
          {location?.port_code || location?.postal_code ? (
            <div className={styles.Code}>
              ({location?.port_code || location?.postal_code})
            </div>
          ) : (
            <div style={{ height: "16px" }} />
          )}

          <div className={styles.Country}>{location?.country}</div>
        </div>

        <div className={styles.Value}>{location?.name}</div>
        {icdInfo?.name ? (
          <div className={styles.Icd}>{icdInfo?.name}</div>
        ) : null}
      </>
    );
  };

  const renderLocation = () => {
    if (!destination) {
      let tradeType = "";
      if (data?.trade_type === "export") {
        tradeType = "Origin";
      } else if (data?.trade_type === "import") {
        tradeType = "Destination";
      }

      if (data?.shipment_type?.includes("_local")) {
        return (
          <>
            <div className={`customs ${styles.FlexRowOrigin}`}>
              <div className={styles.Text}>{tradeType}</div>
              <div className={styles.Text}>Location : </div>
            </div>

            <div className={styles.FlexRowOrigin}>
              {handleLocationDetails(origin, {})}
            </div>
          </>
        );
      }
      return (
        <>
          <div className={`customs ${styles.FlexRowOrigin}`}>
            <div className={styles.Text}>{tradeType}</div>
            <div className={styles.Text}>custom clearance : </div>
          </div>

          <div className={styles.FlexRowOrigin}>
            {handleLocationDetails(origin, {})}
          </div>
        </>
      );
    }
    return (
      <>
        <div className={styles.LocationContainer}>
          <div className={styles.PortPairContainer}>
            <div className={styles.FlexRowOrigin}>
              {handleLocationDetails(origin, origin_main_port)}
              {showDate ? (
                <div className={styles.DateContainer}>
                  ETD -
                  {formatDate(data?.schedule_departure, "dd-MM-yyyy", {}, true)}
                </div>
              ) : null}
            </div>

            <div className={styles.IconWrapper}>
              <IcMPortArrow />
            </div>

            <div className={styles.FlexRowDest}>
              {handleLocationDetails(destination, destination_main_port)}
              {showDate ? (
                <div className={styles.DateContainer}>
                  ETA -
                  {formatDate(data?.schedule_arrival, "dd-MM-yyyy", {}, true)}
                </div>
              ) : null}
            </div>
          </div>

          {showDate ? (
            <div className={styles.Status}>
              Status:{" "}
              <div className={styles.State}>{startCase(data?.state || "")}</div>
            </div>
          ) : null}
        </div>
      </>
    );
  };
  const shipmentTypeName = data?.shipment_type
    ?.split("_")
    ?.join(" ")
    ?.toUpperCase();
  return (
    <div className={styles.Container}>
      <div className={styles.IconAndService}>
        <div> {serviceIcon}</div>
        <div className={styles.serviceName}>{shipmentTypeName || ""}</div>
      </div>

      {renderLocation()}
    </div>
  );
};

export default PortDetails;
