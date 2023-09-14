import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMDiscount, IcMDelete } from '@cogoport/icons-react';

import useUpdateCheckoutPromotion from '../../hooks/useUpdateCheckoutPromotion';

import styles from './styles.module.css';

function AppliedCoupouns({
	isCouponApplied = false,
	promotion = {},
	setShowCoupons = () => {},
	refetch = () => {},
	setCouponApplied = () => {},
	checkout_id = '',
	setDisableCursor = () => {},
}) {
	const { updateCheckoutPromotion = () => {} } = useUpdateCheckoutPromotion({
		checkout_id,
	});

	const removeCoupon = async () => {
		const applyRes = await updateCheckoutPromotion(
			promotion?.id,
			'inactive',
		);
		if (applyRes) {
			await refetch();
			setCouponApplied(false);
			setDisableCursor('');
			setShowCoupons(false);
		}
	};

	if (!isCouponApplied || promotion.codes === undefined) {
		return null;
	}

	return (
		<div className={styles.container}>
			<IcMDiscount />
			<div className={styles.promocode_content}>
				<div className={styles.card_div}>
					<div className={styles.promocode_title}>
						{promotion.codes[GLOBAL_CONSTANTS.zeroth_index].promocode}
					</div>
					<div className={styles.flex_div}>
						<div
							role="presentation"
							className={styles.change_link}
							onClick={() => setShowCoupons(true)}
						>
							Change
						</div>

						<IcMDelete onClick={removeCoupon} className={styles.delete_icon} />
					</div>
				</div>
				<div className={styles.promocode_caption}>
					{promotion.total_discount.toLocaleString()}
					{' '}
					{promotion.currency}
					{' '}
					off
					applied with this promocode successfully
				</div>
			</div>

		</div>
	);
}

export default AppliedCoupouns;
