import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { isEmpty } from '@cogoport/utils';
import { useState } from 'react';

import PromocodeDetails from './PromocodeDetails';
import styles from './styles.module.css';

function PromoCode({ promotion = {} }) {
	const [showDetails, setShowDetails] = useState(false);

	if (isEmpty(promotion.codes)) {
		return null;
	}

	const getDiscountPercent = (Promotion) => {
		const message = `${Math.round(
			promotion.promotion_discounts[GLOBAL_CONSTANTS.zeroth_index].value,
		)}${
			promotion.promotion_discounts[GLOBAL_CONSTANTS.zeroth_index].unit
			=== 'percentage'
				? '%'
				: promotion.promotion_discounts[GLOBAL_CONSTANTS.zeroth_index]
					.amount_currency
		} off`;

		if (Promotion.level === 'service_level') {
			if (
				promotion.promotion_discounts.length > GLOBAL_CONSTANTS.zeroth_index
			) {
				return `${message} on ${promotion.promotion_discounts[
					GLOBAL_CONSTANTS.zeroth_index
				].service_type.replace('_', ' ')} & more`;
			}
			return `${message} on ${promotion.promotion_discounts[
				GLOBAL_CONSTANTS.zeroth_index
			].service_type.replace('_')}`;
		}

		return message;
	};

	return (
		<>
			<div
				role="presentation"
				className={styles.container}
				onClick={() => setShowDetails(true)}
			>
				<div className={styles.text}>
					Apply
					{' "'}
					{promotion.codes?.[GLOBAL_CONSTANTS.zeroth_index]?.promocode}
					{'" '}
					to
					get
					{' '}
					{getDiscountPercent(promotion)}
				</div>
			</div>

			{showDetails && (
				<PromocodeDetails
					promotion={promotion}
					setShowDetails={setShowDetails}
				/>
			)}
		</>
	);
}

export default PromoCode;
