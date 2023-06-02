import { ResponsivePie } from '@cogoport/charts/pie';
import { cl } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

import { TOTAL_FEEDBACK_KEY } from '../../../../constants';

import styles from './styles.module.css';

function FeedbackGraph({ customerSatisfactionStats }) {
	const pieData = Object.keys(customerSatisfactionStats || {}).map((key) => ({
		id    : key.toLocaleLowerCase(),
		label : key,
		value : customerSatisfactionStats[key] || 0,
	})).filter((item) => item.label !== TOTAL_FEEDBACK_KEY);

	return (
		<div className={styles.container}>
			<div className={styles.graph}>
				<ResponsivePie
					data={pieData}
					innerRadius={0.8}
					enableArcLinkLabels={false}
					enableArcLabels={false}
					colors={['#FEF199', '#CFEAED', '#FDEBE9']}
					colorBy="index"
					startAngle={-90}
					endAngle={90}
					margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
					tooltip={({
						datum: { id = '', label = '', value = '' },
					}) => (
						<div className={styles.pie_tooltip}>
							<div className={cl`${styles.tooltip_dot} ${styles[id]}`} />

							<div>
								{label}
								:
								{' '}
								{value}
								{' '}
								customers
							</div>
						</div>
					)}
				/>
				<div className={styles.graph_total}>
					<span className={styles.graph_count}>
						{formatAmount({
							amount  : customerSatisfactionStats?.TotalFeedback || 0,
							options : {
								style                 : 'decimal',
								notation              : 'compact',
								maximumFractionDigits : 2,
							},
						})}

					</span>
					<span className={styles.graph_label}>Tickets</span>
				</div>
			</div>

			<div className={styles.legends}>
				{(pieData || []).map(({ id, label, value }) => (
					<div className={styles.legend} key={id}>
						<div className={styles.legend_count}>
							<div className={cl`${styles.dot} ${styles[id]}`} />
							<span className={styles.stats_count}>{value || 0}</span>
						</div>
						<div className={styles.stats_label}>{label}</div>
					</div>
				))}
			</div>
		</div>

	);
}

export default FeedbackGraph;
