import styles from "./styles.module.css";
import { format } from "@cogoport/utils";

function ShippingLineDetails({ item }) {
    console.log("items: ", item);
    console.log("name: ", item?.name);

    return (
        <div className={styles.container}>
            <div>{item?.name || "--"}</div>
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
                <div>toggler</div>
                <div>
                    Updated On:{" "}
                    {format(item?.updated_at, "dd MMM yyyy", null, true)}{" "}
                </div>
            </div>
        </div>
    );
}

export default ShippingLineDetails;
