import { useContext } from 'react';

import { CheckoutContext } from '../../../../../context';

import styles from './styles.module.css';

function ServiceChargesTitle({
	convenienceFeeDisplay = '',
	taxesDisplay = '',
	subTotalDisplay = '',
	discount = 0,
	localedDiscount = '',
	showTaxes = true,
}) {
	const { isMobile = false } = useContext(CheckoutContext);

	return (
		<div className={styles.container}>
			<div className={styles.service_name}>Bill Summary</div>

			{ !isMobile ? (
				<div className={styles.flex}>
					<div className={styles.price_display} style={{ marginRight: '8px' }}>
						<div
							style={{ color: '#c26d1a' }}
							className={styles.label}
						>
							{discount ? 'Coupon Applied' : 'Apply Coupon'}
						</div>

						{discount ? <div className={styles.coupon_value}>{localedDiscount}</div> : null}
					</div>
					|
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
			) : null}
		</div>
	);
}

export default ServiceChargesTitle;
