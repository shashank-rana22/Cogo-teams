import styles from "./styles.module.css";
import ShippingLineDetails from "./ShippingLineDetails";
import PortPair from "./PortPairs";
import TimeTable from "./TimeTable";

function Cards({ item, mapTab, setMapTab }) {
    const onClickHandle = () => {
        setMapTab(item);
    };

    return (
        <div className={styles.container} onClick={() => onClickHandle()}>
            <ShippingLineDetails item={item} />
            <div className={styles.details}>
                <PortPair item={item} />
                <TimeTable item={item} />
            </div>
        </div>
    );
}

export default Cards;
