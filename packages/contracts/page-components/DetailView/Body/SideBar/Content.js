import { IcMAir, IcMFcl, IcMLcl } from "@cogoport/icons-react";

import PortPair from "../../../PageView/List/Card/PortPair";

import Footer from "./Footer";
import styles from "./styles.module.css";

const iconMapping = {
  fcl_freight: IcMFcl,
  lcl_freight: IcMLcl,
  air_freight: IcMAir,
};

function Content({
  portPair,
  activePair,
  handlePortChange,
  handleUpdateContract,
  statsData,
  status
}) {
  const Element = iconMapping[portPair?.service_type || "fcl_freight"];
  return (
    <div
      className={activePair?.id === portPair?.id ? styles.port_pair_active : ""}
    >
      <div className={styles.sub_container}>
        <div className={styles.service}>
          <Element width={30} height={30} style={{ padding: "4px" }} />
          {`${portPair?.service_type?.split("_")[0]} ${
            portPair?.service_type?.split("_")[1]
          }`}
        </div>

        <div className={styles.pair}>
          <div className={styles.port_pair}>
            <PortPair
              portPair={portPair}
              handlePortChange={handlePortChange}
              detailView
            />
            {portPair?.status === "quoted"  && status=== 'pending_approval' ? (
              <div className={styles.buttons}>
                <div
                  className={styles.button_reject}
                  role="presentation"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpdateContract({
                      payload: {
                        id: portPair?.id,
                        service_type: portPair?.service_type,
                        status: "rejected",
                      },
                    });
                  }}
                >
                  REJECT
                </div>
                <div
                  className={styles.button_approve}
                  role="presentation"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUpdateContract({
                      payload: {
                        id: portPair?.id,
                        service_type: portPair?.service_type,
                        status: "approved",
                      },
                    });
                  }}
                >
                  APPROVE
                </div>
              </div>
            ) : null}
          </div>
          <Footer statsData={statsData} portPair={portPair} />
        </div>
      </div>
      <div className={styles.line} />
    </div>
  );
}

export default Content;
