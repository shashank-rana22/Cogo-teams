import { cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import styles from './styles.module.css';

function OutStandingStatsCommonCard({
	label, item,
	amountValue,
}) {
	return (
		<div className={styles.invoices_card}>
			<div className={styles.left_container}>
				<div className={styles.heading_styled}>{label}</div>
				<div className={styles.amount}>
					{formatAmount({
						amount   : item.open_invoice_amount || GLOBAL_CONSTANTS.zeroth_index,
						currency : 'INR',
						options  : {
							style                 : 'currency',
							currencyDisplay       : 'code',
							maximumFractionDigits : 0,
							minimumFractionDigits : 0,
						},
					})}
				</div>
			</div>
			<div className={styles.right_container}>
				{(amountValue || []).map((val) => (
					<div className={styles.due_ageing} key={val?.label}>
						<div className={styles.label}>{val.label}</div>
						<div
							className={cl`${styles.amount} 
                                ${val.label === 'ON ACCOUNTS PAYMENTS' ? styles.on_account_amount
								: styles.overall_stats_amount}`}
						>
							{formatAmount({
								amount   : item[val.valueKey] || GLOBAL_CONSTANTS.zeroth_index,
								currency : 'INR',
								options  : {
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 0,
									minimumFractionDigits : 0,
								},
							})}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default OutStandingStatsCommonCard;
