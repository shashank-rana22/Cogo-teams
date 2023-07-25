import styles from './styles.module.css';

function ServiceChargesTitle({ convenienceFeeDisplay = '', taxesDisplay = '', subTotalDisplay = '' }) {
	return (
		<div className={styles.container}>
			<div className={styles.service_name}>Service Charges and Taxes</div>

			<div className={styles.flex}>
				<div className={styles.price_display} style={{ marginRight: '20px' }}>
					<div className={styles.label}>Services Sub Total:</div>
					{' '}
					{subTotalDisplay}
				</div>
				|
				<div className={styles.price_display} style={{ marginRight: '20px' }}>
					<div className={styles.label}>Taxes:</div>
					{' '}
					{taxesDisplay}
				</div>
				|
				<div className={styles.price_display}>
					<div className={styles.label}>Convenience Fee:</div>
					{' '}
					{convenienceFeeDisplay}
				</div>
			</div>
		</div>
	);
}

export default ServiceChargesTitle;
