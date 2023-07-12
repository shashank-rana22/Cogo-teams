import InvoicingParties from '../../../../commons/InvoicingParties';

import ShipmentDetails from './components/ShipmentDetails';
import styles from './styles.module.css';

function ShipmentExecution({ loading }) {
	if (loading) {
		return null;
	}

	return (
		<div className={styles.container}>
			<div className={styles.heading}>Initiate Shipment Execution</div>

			<ShipmentDetails />

			<InvoicingParties />
		</div>
	);
}

export default ShipmentExecution;
