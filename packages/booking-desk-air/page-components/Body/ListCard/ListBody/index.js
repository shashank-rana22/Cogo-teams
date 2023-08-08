import CargoDetails from './CargoDetails';
import PortDetails from './PortDetails';
import ShipmentDetails from './ShipmentDetails';
import styles from './styles.module.css';

function ListBody({ item = {} }) {
	return (
		<div className={styles.list_body}>
			<ShipmentDetails item={item} />
			<PortDetails item={item} />
			<CargoDetails item={item} />
		</div>
	);
}
export default ListBody;
