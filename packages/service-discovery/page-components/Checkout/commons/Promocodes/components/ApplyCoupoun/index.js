import { Button, Tooltip } from '@cogoport/components';
import { IcMDiscount } from '@cogoport/icons-react';

import styles from './styles.module.css';

function conditionalWrapper({ condition, wrapper, children }) {
	return condition ? wrapper(children) : children;
}

function ApplyCoupoun({
	isCouponApplied = false,
	setShowCoupons = () => {},
	source = '',
}) {
	if (isCouponApplied) {
		return null;
	}

	return (
		<div style={{ width: '100%' }}>
			{conditionalWrapper({
				condition : source === 'spot_line_booking',
				wrapper   : (children) => (
					<Tooltip
						interactive
						content={(
							<div className={styles.tooltip_content}>
								You cannot select promo code for SpotLine Booking.
							</div>
						)}
					>
						{children}
					</Tooltip>
				),
				children: (
					<Button
						type="button"
						themeType="secondary"
						onClick={() => setShowCoupons(true)}
						size="lg"
						style={{ width: '100%' }}
						disabled={source === 'spot_line_booking'}
					>
						<IcMDiscount />
						<div style={{ marginLeft: '12px' }}>Apply Coupon</div>
					</Button>
				),
			})}
		</div>
	);
}

export default ApplyCoupoun;
