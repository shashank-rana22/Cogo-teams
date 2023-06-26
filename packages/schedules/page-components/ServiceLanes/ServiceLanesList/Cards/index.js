import styles from "./styles.module.css";
import ShippingLineDetails from "./ShippingLineDetails";
import PortPair from "./PortPairs";
import TimeTable from "./TimeTable";
import { useRouter } from "@cogoport/next";

function Cards({ item }) {
    const { push } = useRouter();
    const onClickHandle = () => {
        push(
            "/schedules/service-lanes/[id]",
            `/schedules/service-lanes/${item?.id}`
        );
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
