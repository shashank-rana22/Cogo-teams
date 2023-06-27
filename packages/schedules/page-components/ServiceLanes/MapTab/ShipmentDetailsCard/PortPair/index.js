import { IcMPortArrow } from "@cogoport/icons-react";
import styles from "./styles.module.css";
import { Tooltip } from "@cogoport/components";
import portData from "./utils/portData";

function PortPair({ data }) {
    const {
        origin,
        originPort,
        originLocation,

        destination,
        destinationPort,
        destinationLocation,
        links,
    } = portData({ data });

    return (
        <div className={styles.container}>
            <div className={styles.origin}>
                <Tooltip
                    theme="light"
                    placement="top"
                    interactive
                    content={origin}
                >
                    <div style={{ display: "flex" }}>
                        <div
                            style={{ fontWeight: "600" }}
                        >{`${originPort},`}</div>
                        <div
                            style={{ color: "#f68b21" }}
                        >{`(${data?.[0]?.service_lane_links?.[0]?.port_code})`}</div>
                        <div>{`,${originLocation}`}</div>{" "}
                    </div>
                </Tooltip>
            </div>

            <div className={styles.arrow}>
                <IcMPortArrow />
            </div>

            <div className={styles.destination}>
                <Tooltip
                    theme="light"
                    placement="top"
                    interactive
                    content={destination}
                >
                    <div style={{ display: "flex" }}>
                        <div
                            style={{ fontWeight: "600" }}
                        >{`${destinationPort},`}</div>
                        <div style={{ color: "#f68b21" }}>{`(${
                            data?.[0]?.service_lane_links[links - 1]?.port_code
                        })`}</div>
                        <div>{`,${destinationLocation}`}</div>{" "}
                    </div>
                </Tooltip>
            </div>
        </div>
    );
}

export default PortPair;
