import styles from "./styles.module.css";
import ShippingLineDetails from "./ShippingLineDetails";

function Cards({ item }) {
    return (
        <div className={styles.container}>
            <ShippingLineDetails item={item} />
        </div>
    );
}

export default Cards;
