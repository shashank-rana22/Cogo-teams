import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import ON_ACCOUNTS_PAYMENTS_STATS from '../../../constants/on-account-payment-stats-mapping';
import OVERALL_OUTSTANDING_STATS_LABEL from '../../../constants/overall-outstanding-stats-label';
import OverallStatsKeyMapping from '../../../constants/overall-stats-key-mapping';

import OutStandingStatsCommonCard from './OutStandingStatsCommonCard';
import styles from './styles.module.css';

function OverallOutstandingStats({ item = {}, statsLoading = false }) {
	if (statsLoading) {
		return (
			<div>
				{/* <OrgLoader /> */}
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<div style={{ width: '87%' }}>
				<div style={{
					margin: '1% 4% 0 20%',
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
						label="Open Search"
						item={item}
						amountValue={OverallStatsKeyMapping}
					/>
					<OutStandingStatsCommonCard
						label="On Account Payments"
						item={item}
						amountValue={ON_ACCOUNTS_PAYMENTS_STATS}
					/>
				</div>
			</div>
			<div className={styles.outstanding_card}>
				<div className={styles.total_outstanding_label}>Total Outstanding</div>
				<div className={styles.amount}>
					{formatAmount({
						amount   : item.total_outstanding_amount || GLOBAL_CONSTANTS.zeroth_index,
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
		</div>
	);
}

export default OverallOutstandingStats;
