import Toggler from "./Toggler";
import styles from "./styles.module.css";
import { format } from "@cogoport/utils";

function ShippingLineDetails({ item }) {
    return (
        <div className={styles.container}>
            <div className={styles.shipping_line}>{item?.name || "--"}</div>
            <div className={styles.company_logo_name}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img
                        src={item?.operator?.logo_url}
                        alt="Company Logo"
                        style={{ width: "52px" }}
                    />
                </div>

                <div>{item?.operator?.short_name}</div>
            </div>

            <div className={styles.date_type}>
                <div>
                    <Toggler />
                </div>
                <div className={styles.updated_on}>
                    Updated On :{" "}
                    {format(item?.updated_at, "dd MMM yyyy", null, true)}{" "}
                </div>
            </div>
        </div>
    );
}

export default ShippingLineDetails;
