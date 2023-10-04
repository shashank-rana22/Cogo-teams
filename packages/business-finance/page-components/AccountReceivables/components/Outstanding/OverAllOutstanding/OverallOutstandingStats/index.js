import { Placeholder, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import OVERALL_OUTSTANDING_STATS_LABEL from '../../../../constants/overall-outstanding-stats-label';
import {
	OVERALL_STATS_KEY_MAPPING,
	ONACCOUNT_STATS_KEY_MAPPING,
} from '../../../../constants/overall-stats-key-mapping';

import OutStandingStatsCommonCard from './OutStandingStatsCommonCard';
import styles from './styles.module.css';

function OverallOutstandingStats({ item = {}, statsLoading = false }) {
	const { openInvoiceBucket, onAccountBucket, totalOutstandingBucket, creditNoteBucket } = item || {};
	const { totalLedAmount, ledCurrency } = totalOutstandingBucket || {};

	return (
		<div className={styles.container}>
			<div style={{ width: '87%' }}>
				<div className={styles.stats_label}>
					{(OVERALL_OUTSTANDING_STATS_LABEL || []).map((val) => (
						<div
							key={val?.label}
							style={{ width: '13.7%' }}
						>
							{val.label}
						</div>
					))}
				</div>
				<div style={{ margin: '12px 0px 20px 11px' }}>
					<OutStandingStatsCommonCard
						label="OPEN INVOICES"
						item={openInvoiceBucket}
						amountValue={OVERALL_STATS_KEY_MAPPING}
						statsLoading={statsLoading}
						amountColor="#FC5555"
					/>
					<OutStandingStatsCommonCard
						label="ON ACCOUNT PAYMENTS"
						item={onAccountBucket}
						amountValue={ONACCOUNT_STATS_KEY_MAPPING}
						statsLoading={statsLoading}
						amountColor="#29CC6A"
					/>
					<OutStandingStatsCommonCard
						label="CREDIT NOTES"
						item={creditNoteBucket}
						amountValue={OVERALL_STATS_KEY_MAPPING}
						statsLoading={statsLoading}
						amountColor={creditNoteBucket?.totalLedAmount
							<= [GLOBAL_CONSTANTS.zeroth_index] ? '#29CC6A' : '#FC5555'}
					/>
				</div>
			</div>
			<div className={styles.outstanding_card}>
				<div className={styles.total_outstanding_label}>Total Outstanding</div>
				<div className={cl`${totalLedAmount > GLOBAL_CONSTANTS.zeroth_index
					? styles.amount : styles.credit_note_amount} ${styles.common_amount}`}
				>
					{statsLoading ? <Placeholder /> : formatAmount({
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
			</div>
		</div>
	);
}

export default OverallOutstandingStats;
