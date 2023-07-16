import CargoDetails from '../../../CargoDetails';
import PortDetails from '../../../PortDetails';

import styles from './styles.module.css';

const GET_LAST_STRING = 2;

function ShipmentDetails({ serviceData = {}, name = '' }) {
	const parts = name.split(':');
	const evnetTitle = parts[GET_LAST_STRING].trim();

	return (
		<>
			<div className={styles.title}>{evnetTitle}</div>
			<div className={styles.message}>
				Following are the details of the abandoned shipments -
			</div>

			<div className={styles.banner}>
				<PortDetails serviceData={serviceData} />
				<CargoDetails detail={serviceData} />
			</div>
		</>
	);
}

export default ShipmentDetails;
