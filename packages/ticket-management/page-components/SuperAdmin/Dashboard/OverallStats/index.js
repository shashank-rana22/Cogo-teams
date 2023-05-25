import { ResponsivePie } from '@cogoport/charts/pie/index';
import { cl } from '@cogoport/components';

import { statsIconsAndData } from '../../../../configurations/dashboard-stats';

import styles from './styles.module.css';

function OverallStats({ data, ticketCount }) {
	const pieData = Object.keys(ticketCount || {}).map((key) => ({
		id    : key.toLocaleLowerCase(),
		label : key,
		value : ticketCount[key] || 0,
	}));

	return (
		<div className={styles.container}>
			<div className={cl`${styles.tile} ${styles.total_graph}`}>
				<div className={styles.graph}>
					<ResponsivePie
						data={pieData}
						innerRadius={0.85}
						enableArcLinkLabels={false}
						enableArcLabels={false}
						colors={['#F8AEA8', '#e0e0e0', '#FCDC00', '#7278AD', '#2AC85F']}
						colorBy="index"
						margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
						tooltip={({
							datum: { label = '', value = '', id = '' },
						}) => (
							<div className={styles.pie_tooltip}>
								<div className={cl`${styles.tooltip_dot} ${styles[id]}`} />
								<div>
									{label}
									:
									{' '}
									{value}
									{' '}
									Tickets
								</div>
							</div>
						)}
					/>
				</div>
				<div className={styles.graph_total}>
					<span className={styles.graph_label}>No. of Tickets</span>
					<span className={styles.graph_count}>8.4k</span>
				</div>
				<div className={styles.legends}>
					{(pieData || []).map(({ id, label, value, isMargin }) => (
						<div className={cl`${styles.legend} ${isMargin ? styles.margin_bottom : ''}`} key={id}>
							<div className={styles.legend_count}>
								<div className={cl`${styles.dot} ${styles[id]}`} />
								<span className={styles.stats_count}>{value}</span>
							</div>
							<div className={styles.stats_label}>{label}</div>
						</div>
					))}
				</div>
			</div>
			{(statsIconsAndData || []).map(({ key, icon, label }) => (
				<div className={styles.tile} key={key}>
					<div>{icon}</div>
					<div className={styles.count}>{data?.[key] || 0}</div>
					<div className={styles.label}>{label}</div>
				</div>
			))}
		</div>

	);
}

export default OverallStats;
