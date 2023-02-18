import { Tooltip } from '@cogoport/components';
import { getFormattedPrice } from '@cogoport/forms';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import { SERVICE } from '../../../../../constants';

import styles from './styles.module.css';
import TermsAndConditions from './TermsAndConditions';

function PromocodeThumbnail({ list = [] }) {
	const colors = ['#e66465', '#ff7675', '#55E6C1'];

	const getCardColor = (index) => colors[index % colors.length];

	const defaultImage = 'https://cogoport-production.sgp1.digitaloceanspaces.com/eb9c91d9226c746eee7eb971c0dfdfeb/Group.svg';
	return (
		<div className={styles.thumbnail_container}>
			{(list || []).map((item, index) => {
				const { promotion_discounts, terms_and_conditions, thumbnail_image, codes } = item || [];
				return (
					<div
						className={styles.container}
						style={{ backgroundColor: getCardColor(index) }}
					>

						<img
							className={styles.promo_image}
							src={isEmpty(thumbnail_image) ? defaultImage : thumbnail_image}
							alt="promotion"
						/>

						<div className={styles.promocode_description}>
							<div className={styles.promodiscount}>
								{promotion_discounts?.[0]?.unit !== 'percentage'
						|| promotion_discounts?.[0]?.unit !== 'by_unit_percentage'
									? `${getFormattedPrice(
										promotion_discounts?.[0]?.value || 0,
										promotion_discounts?.[0]?.amount_currency || 'INR',
										{
											currencyDisplay: 'code',
										},
										'en-Us',
									)}`
									: `${promotion_discounts?.[0]?.value} %`}
								{' '}
								Off On
								{' '}
								{SERVICE[promotion_discounts?.[0]?.service_type
								]}
							</div>

						</div>
						<div className={styles.tooltip_div}>
							<Tooltip
								content={(
									<TermsAndConditions
										termsAndConditions={terms_and_conditions}
									/>
								)}
								placement="top"
							>
								<div className={styles.terms_conditions}>
									Terms and Conditions Apply
								</div>
							</Tooltip>

						</div>
						<div className={styles.holes_lower} />
						<div className={styles.promoCode}>
							<div className={styles.promocode_name}>
								{codes?.[0]?.promocode}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default PromocodeThumbnail;
