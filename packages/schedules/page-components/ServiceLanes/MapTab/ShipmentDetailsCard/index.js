import PortPair from "./PortPair";
import ShippingDetails from "./ShippingDetails";
import UpdatedOn from "./UpdatedOn";
import styles from "./styles.module.css";
import LoadingState from "../../LoadingState";

function ShipmentDetailsCard({ data, loading }) {
    return (
        <>
            {!loading ? (
                <div
                    className={styles.container}
                    onClick={() => onClickHandle()}
                >
                    <ShippingDetails data={data} />
                    <div className={styles.details}>
                        <PortPair data={data} />
                        <UpdatedOn data={data} />
                    </div>
                </div>
            ) : (
                <LoadingState />
            )}
        </>
    );
}

export default ShipmentDetailsCard;
