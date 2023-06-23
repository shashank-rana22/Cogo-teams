import Toggler from "./Toggler";
import styles from "./styles.module.css";
// import { format } from "@cogoport/utils";

function ShippingDetails({ mapTab }) {
    return (
        <div className={styles.container}>
            <div className={styles.shipping_line}>{mapTab?.name || "--"}</div>
            <div className={styles.company_logo_name}>
                <div style={{ display: "flex", alignMapTabs: "center" }}>
                    <img
                        src={mapTab?.operator?.logo_url}
                        alt="Company Logo"
                        style={{ width: "52px" }}
                    />
                </div>

                <div>{mapTab?.operator?.short_name}</div>
            </div>

            <div className={styles.date_type}>
                <div>
                    <Toggler mapTab={mapTab} />
                </div>
                {/* <div className={styles.updated_on}>
                    Updated On :{" "}
                    {format(mapTab?.updated_at, "dd MMM yyyy", null, true)}{" "}
                </div> */}
            </div>
        </div>
    );
}

export default ShippingDetails;
