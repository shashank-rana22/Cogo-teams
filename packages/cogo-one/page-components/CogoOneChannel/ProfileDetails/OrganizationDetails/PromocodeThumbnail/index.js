import { Tooltip } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import { SERVICE } from '../../../../../constants';

import styles from './styles.module.css';
import TermsAndConditions from './TermsAndConditions';

const FIRST_ITEM = 0;
const DEFAULT_IMAGE = GLOBAL_CONSTANTS.image_url.promocode_thumbnail;

function PromocodeThumbnail({ list = [] }) {
	const colors = [
		'rgba(204, 197, 249, 0.8) rgba(195, 216, 254, 0.6)',
		'rgba(245, 191, 157, 0.7) rgba(239, 135, 152, 0.52)',
		'rgba(209, 255, 241, 0.8) rgba(108, 188, 227, 0.6)',
	];

	const getCardColor = (index) => colors[index % colors.length];

	return (
		<div className={styles.thumbnail_container}>
			{(list || []).map((item, index) => {
				const { promotion_discounts, terms_and_conditions, thumbnail_image, codes } = item || [];

				return (
					<div
						key={promotion_discounts[index].id}
						className={styles.container}
						style={{ backgroundColor: getCardColor(index) }}
					>

						<img
							className={styles.promo_image}
							src={isEmpty(thumbnail_image) ? DEFAULT_IMAGE : thumbnail_image}
							alt="promotion"
						/>

						<div className={styles.promocode_description}>
							<div className={styles.promodiscount}>
								{promotion_discounts?.[FIRST_ITEM]?.unit !== 'percentage'
						|| promotion_discounts?.[FIRST_ITEM]?.unit !== 'by_unit_percentage'
									? `${formatAmount({
										amount   :	promotion_discounts?.[FIRST_ITEM]?.value || FIRST_ITEM,
										currency :	promotion_discounts?.[FIRST_ITEM]?.amount_currency
										|| GLOBAL_CONSTANTS.currency_code.INR,
										options: {
											currencyDisplay : 'code',
											style           : 'currency',
										},
									})}`
									: `${promotion_discounts?.[FIRST_ITEM]?.value} %`}
								{' '}
								Off On
								{' '}
								{SERVICE[promotion_discounts?.[FIRST_ITEM]?.service_type
								]}
							</div>

						</div>
						<div className={styles.tooltip_div}>
							<Tooltip
								interactive
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
						<div className={styles.promo_code}>
							<div className={styles.promocode_name}>
								{codes?.[FIRST_ITEM]?.promocode}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default PromocodeThumbnail;
