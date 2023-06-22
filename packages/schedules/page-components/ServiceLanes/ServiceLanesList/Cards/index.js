import styles from "./styles.module.css";
import ShippingLineDetails from "./ShippingLineDetails";
import PortPair from "./PortPairs";
import TimeTable from "./TimeTable";

function Cards({ item }) {
    return (
        <div className={styles.container}>
            <ShippingLineDetails item={item} />
            <div className={styles.details}>
                <PortPair item={item} />
                <TimeTable item={item} />
            </div>
        </div>
    );
}

export default Cards;
