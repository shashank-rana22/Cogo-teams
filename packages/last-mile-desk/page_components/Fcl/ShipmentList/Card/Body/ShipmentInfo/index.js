import styles from './styles.module.css';

function ShipmentInfo({ item = {} }) {
	const { lastmile_ops = {}, shipping_line = {}, service_provider = {}, serial_id = '' } = item || {};

	return (
		<div>
			<div className={styles.serial_id}>
				Shipment ID #
				{' '}
				{serial_id || ''}
			</div>

			<div className={styles.service_provider}>
				{service_provider?.business_name}
			</div>

			<div className={styles.shipping_line}>
				<span className={styles.line_heading}>Line:</span>
				{' '}
				{shipping_line?.business_name}
			</div>

			{lastmile_ops?.name && (
				<div className={styles.last_mile}>
					LASTMILE OPS :
					{' '}
					{lastmile_ops?.name}
				</div>
			)}
		</div>
	);
}
export default ShipmentInfo;
