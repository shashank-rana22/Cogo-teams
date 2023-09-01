import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import OVERALL_OUTSTANDING_STATS_LABEL from '../../../../constants/overall-outstanding-stats-label';
import OVERALL_STATS_KEY_MAPPING from '../../../../constants/overall-stats-key-mapping';

import OutStandingStatsCommonCard from './OutStandingStatsCommonCard';
import styles from './styles.module.css';

const DEFAULT_AMOUNT = 0;
function OverallOutstandingStats({ item = {}, statsLoading = false }) {
	const { openInvoiceBucket, onAccountBucket, totalOutstandingBucket, creditNoteBucket } = item || {};
	const { totalLedAmount, ledCurrency, totalCount } = totalOutstandingBucket || {};

	return (

		<div className={styles.container}>
			<div style={{ width: '87%' }}>
				<div style={{
					margin : '16px 0px 0px 252px',
					width  : '74.5%',
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
						amountValue={OVERALL_STATS_KEY_MAPPING}
						statsLoading={statsLoading}
					/>
					<OutStandingStatsCommonCard
						label="On Account Payments"
						item={onAccountBucket}
						amountValue={OVERALL_STATS_KEY_MAPPING}
						statsLoading={statsLoading}
					/>
					<OutStandingStatsCommonCard
						label="Credit Notes"
						item={creditNoteBucket}
						amountValue={OVERALL_STATS_KEY_MAPPING}
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
					{statsLoading ? <Placeholder width="60px" style={{ marginTop: 8 }} />
						: `(${totalCount || DEFAULT_AMOUNT})`}
				</div>
			</div>
		</div>
	);
}

export default OverallOutstandingStats;
