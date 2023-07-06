import InvoicingParties from './components/InvoicingParties';
import ShipmentDetails from './components/ShipmentDetails';
import styles from './styles.module.css';

function ShipmentExecution() {
	return (
		<div className={styles.container}>
			<div className={styles.heading}>Initiate Shipment Execution</div>

			<ShipmentDetails />

			<InvoicingParties />
		</div>
	);
}

export default ShipmentExecution;
