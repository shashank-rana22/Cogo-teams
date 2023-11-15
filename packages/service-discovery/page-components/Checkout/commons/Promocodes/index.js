import { useState } from 'react';

import AppliedCoupouns from './components/AppliedCoupouns';
import ApplyCoupoun from './components/ApplyCoupoun';
import PromocodesModal from './components/PromocodesModal';
import styles from './styles.module.css';

function Promocodes({ checkout_id = '', refetch = () => {}, promotions = [], source = '' }) {
	const appliedPromotion = (promotions || []).find(
		(x) => x.consumption_mode === 'manual',
	);

	const [showCoupons, setShowCoupons] = useState(false);
	const [disableCursor, setDisableCursor] = useState('');

	const [isCouponApplied, setCouponApplied] = useState(
		appliedPromotion?.id !== undefined,
	);

	return (
		<div className={styles.container}>
			<AppliedCoupouns
				isCouponApplied={isCouponApplied}
				setShowCoupons={setShowCoupons}
				promotion={appliedPromotion}
				setCouponApplied={setCouponApplied}
				checkout_id={checkout_id}
				refetch={refetch}
				setDisableCursor={setDisableCursor}
			/>

			<ApplyCoupoun
				isCouponApplied={isCouponApplied}
				setShowCoupons={setShowCoupons}
				source={source}
			/>

			<PromocodesModal
				checkout_id={checkout_id}
				setShowCoupons={setShowCoupons}
				setCouponApplied={setCouponApplied}
				refetch={refetch}
				appliedPromotion={appliedPromotion}
				isCouponApplied={isCouponApplied}
				showCoupons={showCoupons}
				disableCursor={disableCursor}
				setDisableCursor={setDisableCursor}
			/>
		</div>
	);
}

export default Promocodes;
