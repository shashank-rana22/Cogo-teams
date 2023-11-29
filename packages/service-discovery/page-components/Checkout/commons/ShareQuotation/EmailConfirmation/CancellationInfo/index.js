import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { useMemo } from 'react';

import CANCELLATION_MAPPINGS from './cancellationMappings';
import styles from './styles.module.css';

const getCharges = ({ cancellation_charges }) => (cancellation_charges || []).map((item) => {
	const { conditions, charge_type, value, currency } = item;
	const { schedule_departure = '' } = conditions?.[GLOBAL_CONSTANTS.zeroth_index] || {};
	const [conditionality, days] = schedule_departure?.split(' ') || [];

	const charge = charge_type === 'percentage'
		? `${value}% of Ocean freight`
		: `${formatAmount({
			amount  : value,
			currency,
			options : {
				style                 : 'currency',
				currencyDisplay       : 'code',
				maximumFractionDigits : 2,
			},
		})} (${charge_type})`;

	if (conditions) {
		return {
			label : `${days} ${CANCELLATION_MAPPINGS[conditionality]}`,
			value : charge,
		};
	}

	return {
		label : CANCELLATION_MAPPINGS[item.milestone],
		value : charge,
	};
});

function CancellationInfo({ detail = {} }) {
	const { cancellation_charges } = detail;

	const charges = useMemo(
		() => getCharges({ cancellation_charges }),
		[cancellation_charges],
	);

	return (
		<div className={styles.container}>
			<div className={styles.card_header}>
				<div className={styles.heading}>Cancellation Time Frame</div>
				<div className={styles.heading}>Charges</div>
			</div>

			<div className={styles.card_items}>
				{charges.map((item, idx) => {
					const { label, value } = item;
					const key = (label || '').replace(' ', '').concat(idx);
					return (
						<div className={styles.items} key={key}>
							<div className={styles.cancellation}>{label}</div>
							<div className={styles.charge}>{value}</div>
						</div>
					);
				})}
			</div>

			<div className={styles.text}>
				Cancellations made within 10 days of departure and after receiving the
				booking note or shipping order will incur no-show fees, which will be
				billed at actuals.
			</div>
		</div>
	);
}

export default CancellationInfo;
