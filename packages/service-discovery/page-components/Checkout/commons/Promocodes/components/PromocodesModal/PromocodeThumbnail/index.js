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
	is_applicable = false,
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

	let backgroundStyle = {};
	let textStyle = {};
	let borderColor = {};

	if (!is_applicable) {
		backgroundStyle = { background: '#f2f2f2' };
		textStyle = { color: '#888' };
		borderColor = { border: '6px solid #bdbdbd' };
	}

	return (
		<div
			role="presentation"
			className={styles.container}
			style={{ cursor: disableCursor, background: bgColor, ...backgroundStyle }}
			onClick={() => {
				if (is_applicable) applyPromocode();
			}}
		>
			{promotion.category === 'business' && (
				<div className={styles.discount_amount_percent} style={borderColor}>
					<span className={styles.flat_text} style={textStyle}>FLAT</span>
					<span className={styles.amount} style={textStyle}>
						{formatAmount({
							amount: promotion.promotion_discounts[GLOBAL_CONSTANTS.zeroth_index].value || DEFAULT_VALUE,
							currency:
								promotion.promotion_discounts[GLOBAL_CONSTANTS.zeroth_index].amount_currency
								|| geo.country.currency.code,
							options: {
								style                 : 'currency',
								maximumFractionDigits : 2,
							},
						})}
						<span className={cl`${styles.amount} ${styles.space_left}`} style={textStyle}>Off</span>
					</span>
				</div>
			)}
			{promotion.category === 'marketing'
				&& promotion.promotion_discounts[GLOBAL_CONSTANTS.zeroth_index].unit === 'percentage' && (
					<>
						<div
							className={styles.banner_image}
							style={{ backgroundImage: `url(${promotion.thumbnail_image})`, ...backgroundStyle }}

						/>
						<div className={styles.circle_icon}>
							<div className={styles.discount} style={textStyle}>
								{Math.round(promotion.promotion_discounts[GLOBAL_CONSTANTS.zeroth_index].value)}
								%
								{' '}
								<br />
								<span className={styles.off_text} style={textStyle}>Off</span>
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

									<span
										className={cl`${styles.off_text} ${styles.space_left}`}
										style={textStyle}
									>
										Off
									</span>
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

			<div className={styles.tool_tip_div}>
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
					<div
						className={styles.text}
						style={textStyle}
					>
						Terms and Conditions Apply

					</div>
				</Tooltip>
			</div>

			<div className={styles.holes_lower} style={{ color: dashedColor }} />

			<div className={styles.promo_code}>
				<div
					className={styles.promo_code_name}
					style={{ ...backgroundStyle, ...(!is_applicable) ? { color: '#828282' } : {} }}
				>
					{promotion.codes[GLOBAL_CONSTANTS.zeroth_index].promocode}
				</div>
			</div>
		</div>
	);
}

export default PromocodeThumbnail;
