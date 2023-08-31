import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import ON_ACCOUNTS_PAYMENTS_STATS from '../../../../constants/on-account-payment-stats-mapping';
import OVERALL_OUTSTANDING_STATS_LABEL from '../../../../constants/overall-outstanding-stats-label';
import OverallStatsKeyMapping from '../../../../constants/overall-stats-key-mapping';

import OutStandingStatsCommonCard from './OutStandingStatsCommonCard';
import styles from './styles.module.css';

function OverallOutstandingStats({ item = {}, statsLoading = false }) {
	const { openInvoiceBucket, onAccountBucket, totalOutstandingBucket, creditNoteBucket } = item || {};
	const { totalLedAmount, ledCurrency, totalCount } = totalOutstandingBucket || {};

	return (
		<div className={styles.container}>
			<div style={{ width: '87%' }}>
				<div style={{
					margin: '1% 4% 0 23%',
				}}
				>
					<div style={{
						display        : 'flex',
						justifyContent : 'space-around',
						fontWeight     : 600,
						fontSize       : '12px',
					}}
					>
						{(OVERALL_OUTSTANDING_STATS_LABEL || []).map((val) => (
							<div
								key={val?.label}
								style={{
									width: '16%',
								}}
							>
								{val.label}
							</div>
						))}
					</div>
				</div>
				<div style={{ margin: '12px 0px 20px 11px' }}>
					<OutStandingStatsCommonCard
						label="Open invoices"
						item={openInvoiceBucket}
						amountValue={OverallStatsKeyMapping}
						statsLoading={statsLoading}
					/>
					<OutStandingStatsCommonCard
						label="On Account Payments"
						item={onAccountBucket}
						amountValue={ON_ACCOUNTS_PAYMENTS_STATS}
						statsLoading={statsLoading}
					/>
					<OutStandingStatsCommonCard
						label="Credit Notes"
						item={creditNoteBucket}
						amountValue={ON_ACCOUNTS_PAYMENTS_STATS}
						statsLoading={statsLoading}
					/>
				</div>
			</div>
			<div className={styles.outstanding_card}>
				<div className={styles.total_outstanding_label}>Total Outstanding</div>
				<div className={styles.amount}>
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
				<div style={{ fontSize: '12px', color: '#0099FF' }}>
					{statsLoading ? <Placeholder width="60px" style={{ marginTop: 8 }} /> : `(${totalCount})`}
				</div>
			</div>
		</div>
	);
}

export default OverallOutstandingStats;
