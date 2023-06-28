import Toggler from "./Toggler";
import styles from "./styles.module.css";

function ShippingDetails({ data }) {
    return (
        <div className={styles.container}>
            <div className={styles.shipping_line}>
                {data?.[0]?.name || "--"}
            </div>
            <div className={styles.company_logo_name}>
                <div style={{ display: "flex", alignMapTabs: "center" }}>
                    <img
                        src={data?.[0]?.operator?.logo_url}
                        alt="Company Logo"
                        style={{ width: "52px" }}
                    />
                </div>

                <div>{data?.[0]?.operator?.short_name}</div>
            </div>

            <div className={styles.date_type}>
                <div>
                    <Toggler data={data} />
                </div>
            </div>
        </div>
    );
}

export default ShippingDetails;
