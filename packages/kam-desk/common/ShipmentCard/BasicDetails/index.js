import styles from './styles.module.css';

function BasicDetails({ data = {} }) {
	return (
		<div>
			<div className={styles.serial_id}>
				Shipment ID #
				{' '}
				{data?.serial_id || ''}
			</div>

			<div className={styles.importer_exporter}>
				{data?.importer_exporter?.business_name || ''}
			</div>
		</div>
	);
}

export default BasicDetails;
