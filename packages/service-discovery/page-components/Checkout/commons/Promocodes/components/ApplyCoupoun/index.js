import { Button } from '@cogoport/components';
import { IcMDiscount } from '@cogoport/icons-react';

function ApplyCoupoun({ isCouponApplied = false, setShowCoupons = () => {} }) {
	if (isCouponApplied) {
		return null;
	}

	return (
		<Button
			type="button"
			themeType="secondary"
			onClick={() => setShowCoupons(true)}
			size="lg"
			style={{ width: '100%' }}
		>
			<IcMDiscount />
			<div style={{ marginLeft: '12px' }}>Apply Coupon</div>
		</Button>
	);
}

export default ApplyCoupoun;
