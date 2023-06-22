import { IcMPortArrow } from "@cogoport/icons-react";
import styles from "./styles.module.css";
import { Tooltip } from "@cogoport/components";
import portData from "./utils/portData";

function PortPair({ item }) {
    const {
        origin,
        originPort,
        originLocation,

        destination,
        destinationPort,
        destinationLocation,
        links,
    } = portData({ item });

    return (
        <div className={styles.container}>
            <div className={styles.origin}>
                <div className={styles.origin_heading}>Origin</div>
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
                        >{`(${item?.service_lane_links[0]?.port_code})`}</div>
                        <div>{`,${originLocation}`}</div>{" "}
                    </div>
                </Tooltip>
            </div>

            <div className={styles.arrow}>
                <IcMPortArrow />
            </div>

            <div className={styles.destination}>
                <div className={styles.destination_heading}>Destination</div>
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
                            item?.service_lane_links[links - 1]?.port_code
                        })`}</div>
                        <div>{`,${destinationLocation}`}</div>{" "}
                    </div>
                </Tooltip>
            </div>
        </div>
    );
}

export default PortPair;
