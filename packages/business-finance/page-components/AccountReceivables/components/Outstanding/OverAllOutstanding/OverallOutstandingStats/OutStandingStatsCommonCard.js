import { cl, Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import styles from './styles.module.css';

const DEFAULT_COUNT = 0;
function OutStandingStatsCommonCard({
	label = '', item = {},
	amountValue = [],
	statsLoading = false,
}) {
	const { totalLedAmount, totalCount, ledCurrency } = item || {};

	return (
		<div className={styles.invoices_card}>
			<div className={styles.left_container}>
				<div className={styles.heading_styled}>{label}</div>
				<div className={styles.amount}>
					{statsLoading ? <Placeholder />
						: formatAmount({
							amount   : totalLedAmount || GLOBAL_CONSTANTS.zeroth_index,
							currency : ledCurrency,
							options  : {
								style                 : 'currency',
								currencyDisplay       : 'code',
								maximumFractionDigits : 0,
								minimumFractionDigits : 0,
							},
						})}
				</div>
				<div style={{ fontSize: '12px', color: '#0099FF' }}>
					{statsLoading ? <Placeholder width="60px" style={{ marginTop: 8 }} />
						: `(${totalCount || DEFAULT_COUNT})`}
				</div>
			</div>
			<div className={styles.right_container}>
				{(amountValue || [])?.map((val) => (
					<div className={styles.due_ageing} key={val?.label}>
						<div className={styles.label}>{val?.label}</div>
						<div
							className={cl`${styles.amount} 
                                ${val?.label === 'ON ACCOUNTS PAYMENTS' ? styles.on_account_amount
								: styles.overall_stats_amount}`}
						>
							{ statsLoading ? <Placeholder /> : formatAmount({
								amount   : item[val?.valueKey] || GLOBAL_CONSTANTS.zeroth_index,
								currency : ledCurrency,
								options  : {
									style                 : 'currency',
									currencyDisplay       : 'code',
									maximumFractionDigits : 0,
									minimumFractionDigits : 0,
								},
							})}
						</div>
						<div style={{ fontSize: '12px', color: '#0099FF' }}>
							{statsLoading
								? <Placeholder width="60px" style={{ marginTop: 8 }} />
								: `(${item[val?.countKey] || DEFAULT_COUNT})`}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default OutStandingStatsCommonCard;
