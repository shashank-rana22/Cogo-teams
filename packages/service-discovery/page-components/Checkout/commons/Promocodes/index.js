import { useState } from 'react';

import AppliedCoupouns from './components/AppliedCoupouns';
import ApplyCoupoun from './components/ApplyCoupoun';
import PromocodesModal from './components/PromocodesModal';
import styles from './styles.module.css';

function Promocodes({ checkout_id = '', refetch = () => {}, promotions = [] }) {
	const appliedPromotion = (promotions || []).find(
		(x) => x.consumption_mode === 'manual',
	);

	const [showCoupons, setShowCoupons] = useState(false);

	const [isCouponApplied, setCouponApplied] = useState(
		appliedPromotion?.id !== undefined,
	);

	return (
		<div className={styles.container}>
			<AppliedCoupouns
				isCouponApplied={isCouponApplied}
				setShowCoupons={setShowCoupons}
				promotion={appliedPromotion}
			/>

			<ApplyCoupoun
				isCouponApplied={isCouponApplied}
				setShowCoupons={setShowCoupons}
			/>

			<PromocodesModal
				checkout_id={checkout_id}
				setShowCoupons={setShowCoupons}
				setCouponApplied={setCouponApplied}
				refetch={refetch}
				appliedPromotion={appliedPromotion}
				isCouponApplied={isCouponApplied}
				showCoupons={showCoupons}
			/>
		</div>
	);
}

export default Promocodes;
