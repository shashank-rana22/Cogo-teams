import { Tooltip, cl } from '@cogoport/components';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';

import TermsAndConditions from '../TermsAndConditions';

import styles from './styles.module.css';

const geo = getGeoConstants();

const DEFAULT_VALUE = 0;

function PromocodeThumbnail({
	setShowCoupons = () => {},
	setCouponApplied = () => {},
	disableCursor = false,
	promotion = {},
	refetch = () => {},
	bgColor = '',
	dashedColor = '',
	updateCheckoutPromotion = () => {},
}) {
	const applyPromocode = async () => {
		const applyRes = await updateCheckoutPromotion(promotion.id);

		if (applyRes) {
			await refetch();
			setShowCoupons(false);
			setCouponApplied(true);
		}
	};

	return (
		<div
			role="presentation"
			className={styles.container}
			style={{ cursor: disableCursor, background: bgColor }}
			onClick={applyPromocode}
		>
			{promotion.category === 'business' && (
				<div className={styles.discount_amount_percent}>
					<span className={styles.flat_text}>FLAT</span>
					<span className={styles.amount}>
						{formatAmount({
							amount: promotion.promotion_discounts[GLOBAL_CONSTANTS.zeroth_index].value || DEFAULT_VALUE,
							currency:
								promotion.promotion_discounts[GLOBAL_CONSTANTS.zeroth_index].amount_currency
								|| geo.country.currency.code,
							options: {
								style                 : 'currency',
								maximumFractionDigits : 0,
							},
						})}
						<div className={cl`${styles.amount} ${styles.space_left}`}>Off</div>
					</span>
				</div>
			)}
			{promotion.category === 'marketing'
				&& promotion.promotion_discounts[GLOBAL_CONSTANTS.zeroth_index].unit === 'percentage' && (
					<>
						<div
							className={styles.banner_image}
							style={{ backgroundImage: `url(${promotion.thumbnail_image})` }}

						/>
						<div className={styles.circle_icon}>
							<div className={styles.discount}>
								{Math.round(promotion.promotion_discounts[GLOBAL_CONSTANTS.zeroth_index].value)}
								%
								{' '}
								<br />
								<span className={styles.off_text}>Off</span>
							</div>
						</div>
					</>
			)}
			{promotion.category === 'marketing'
				&& (promotion.promotion_discounts[GLOBAL_CONSTANTS.zeroth_index].unit === 'flat'
					|| promotion.promotion_discounts[GLOBAL_CONSTANTS.zeroth_index].unit === 'by_unit') && (
						<>
							<div
								className={styles.banner_image}
								style={{ backgroundImage: `url(${promotion.thumbnail_image})` }}
							/>
							<div className={styles.badge}>
								<div className={styles.discount_amount}>
									{promotion.promotion_discounts[GLOBAL_CONSTANTS.zeroth_index].amount_currency}
									<div className={cl`${styles.discount_amount} ${styles.align_left}`}>
										{Math.round(promotion.promotion_discounts[GLOBAL_CONSTANTS.zeroth_index].value)}
									</div>

									<span className={cl`${styles.off_text} ${styles.space_left}`}>Off</span>
								</div>
							</div>
						</>
			)}
			{promotion.thumbnail_description && (
				<div className={styles.promo_code_description}>
					{promotion.thumbnail_description || <br />}
				</div>
			)}
			<div className={cl`${styles.service_title} ${styles.space_top}`}>
				On
				{(promotion.services || []).map((item) => (
					<div key={item} className={cl`${styles.service_title} ${styles.space_left}`}>
						{startCase(item)}
					</div>
				))}
			</div>

			<div className={styles.toot_tip_div}>
				<Tooltip
					content={(
						<TermsAndConditions
							termsAndConditions={promotion.terms_and_conditions || []}
						/>
					)}
					interactive
					theme="light"
					placement="left"
					animation="shift-away"
				>
					<div className={styles.text}>Terms and Conditions Apply</div>
				</Tooltip>
			</div>

			<div className={styles.holes_lower} style={{ color: dashedColor }} />

			<div className={styles.promo_code}>
				<div
					className={styles.promo_code_name}
				>
					{promotion.promocodes[GLOBAL_CONSTANTS.zeroth_index].promocode}
				</div>
			</div>
		</div>
	);
}

export default PromocodeThumbnail;
