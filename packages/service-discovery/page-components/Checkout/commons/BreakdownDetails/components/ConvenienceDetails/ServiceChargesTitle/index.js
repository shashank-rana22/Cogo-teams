import styles from './styles.module.css';

function ServiceChargesTitle({
	convenienceFeeDisplay = '',
	taxesDisplay = '',
	subTotalDisplay = '',
	discount = 0,
	localedDiscount = '',
	showTaxes = true,
}) {
	return (
		<div className={styles.container}>
			<div className={styles.service_name}>Bill Summary</div>

			<div className={styles.flex}>
				{discount ? (
					<div className={styles.price_display} style={{ marginRight: '8px' }}>
						<div
							style={{ color: '#c26d1a' }}
							className={styles.label}
						>
							Discount Applied
						</div>

						<div className={styles.coupon_value}>{localedDiscount}</div>
					</div>
				) : null}

				{discount ? '|' : null}

				<div className={styles.price_display} style={{ marginRight: '12px' }}>
					<div className={styles.label}>Services Sub Total:</div>
					{' '}
					{subTotalDisplay}
				</div>
				|
				{showTaxes ? (
					<div className={styles.price_display} style={{ marginRight: '12px' }}>
						<div className={styles.label}>Taxes:</div>
						{' '}
						{taxesDisplay}
					</div>
				)
					: null}

				{showTaxes ? '|' : null}
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
