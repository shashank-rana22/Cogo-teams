import { Tooltip } from '@cogoport/components';
import React from 'react';

import styles from './styles.module.css';
import TermsAndConditions from './TermsAndConditions';

function PromocodeThumbnail({ promoData }) {
	const { list = [] } = promoData || {};
	const colors = ['#e66465', '#ff7675', '#55E6C1'];

	const getCardColor = (index) => colors[index % colors.length];
	// console.log('getCardColor', getCardColor);

	// const defaultImage = 'https://cogoport-production.sgp1.digitaloceanspaces.com/eb9c91d9226c746eee7eb971c0dfdfeb/Group.svg';
	return (
		<div className={styles.thumbnail_container}>
			{(list || []).map((item, index) => (
				<div
					className={styles.container}
					style={{ backgroundColor: getCardColor(index) }}
				>

					<div className={styles.promo_image} />
					<div className={styles.promocode_description}>
						<div className={styles.promodiscount}>
							{/* {discounts[0]?.unit !== 'percentage'
					|| discounts[0]?.unit !== 'by_unit_percentage'
						? `${getFormattedPrice(
							'en-Us',
							discounts[0]?.value || 0,
							discounts[0]?.amount_currency || 'INR',
							{
								currencyDisplay: 'code',
							},
						  )}`
						: `${discounts[0]?.value} %`}
					{' '} */}
							100 % Off on FCL
						</div>
						<div className={styles.promodiscount}>
							{/* {discounts[0]?.unit !== 'percentage'
					|| discounts[0]?.unit !== 'by_unit_percentage'
						? `${getFormattedPrice(
							'en-Us',
							discounts[0]?.value || 0,
							discounts[0]?.amount_currency || 'INR',
							{
								currencyDisplay: 'code',
							},
						  )}`
						: `${discounts[0]?.value} %`}
					{' '} */}
							12% off - upto $500
						</div>
					</div>
					<div className={styles.tooltip_div}>
						<Tooltip content={<TermsAndConditions />} placement="top">
							<div className={styles.terms_conditions}>
								Terms and Conditions Apply
							</div>
						</Tooltip>

					</div>
					<div className={styles.holes_lower} />
					<div className={styles.promoCode}>
						<div className={styles.promocode_name}>
							{item?.promocode}
						</div>
					</div>
				</div>
			))}
		</div>
	);
}

export default PromocodeThumbnail;
