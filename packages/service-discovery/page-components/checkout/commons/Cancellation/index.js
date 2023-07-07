import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty } from '@cogoport/utils';

import CANCELLATION_MAPPINGS from '../../utils/cancellationMappings';

import styles from './styles.module.css';

function Cancellation({ detail, serviceType, source = 'edit_margin' }) {
	const { cancellation_charges } = detail;

	return (
		<div className={`${styles.container} ${styles[source]} ${serviceType === 'fcl_freight' ? 'fcl' : ''}`}>
			<div className={styles.header}>
				<div className={styles.cancellation_policy}>Cancellation Policy</div>
				<div className={styles.horizontal_line} />
				<div>Days Between</div>
			</div>

			<div className={styles.timeline}>
				<div className={`${styles.text} ${styles.first_index}`}>Booking Confirmation</div>
				<div className={styles.vertical_line} />

				<div className={styles.line} />

				<div className={styles.vertical_line_array}>
					{cancellation_charges?.map((item, idx) => {
						const { charge_type, value, currency, milestone, conditions } = item;
						const { schedule_departure = '' } = conditions?.[GLOBAL_CONSTANTS.zeroth_index] || {};
						const [conditionality, days] = schedule_departure?.split(' ') || [];

						return (
							<div
								className={styles.content}
								key={charge_type.replace(' ', '').concat(idx)}
							>
								<div style={{ marginTop: '-4px' }}>
									{charge_type === 'percentage'
										? `${value}% of Ocean freight`
										: `${formatAmount({
											amount  : value,
											currency,
											options : {
												style                 : 'currency',
												currencyDisplay       : 'symbol',
												maximumFractionDigits : 2,
											},
										})} (${charge_type})`}
								</div>

								{milestone === 'booking_confirmation' ? (
									<div className={styles.milestone}>Booking Procurement</div>
								) : null}

								{isEmpty(conditions) ? (
									<div className={styles.condition}>
										{`${days} 
										${CANCELLATION_MAPPINGS[conditionality]}`}
									</div>
								) : null}
							</div>
						);
					})}
				</div>

				<div>
					<div className={`${styles.text} ${styles.last_index}`}>Vessel Departure</div>
					<div className={styles.vertical_line} />
				</div>
			</div>
		</div>
	);
}

export default Cancellation;
