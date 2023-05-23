import { ResponsivePie } from '@cogoport/charts/pie/index';
import { cl } from '@cogoport/components';

import { statsIconsAndData } from '../../../../configurations/stats-data';

import styles from './styles.module.css';

function OverallStats() {
	const PieData = [
		{
			id       : 'Open',
			label    : 'Open',
			value    : 25,
			isMargin : true,
		},
		{
			id       : 'Escalated',
			label    : 'Escalated',
			value    : 30,
			isMargin : true,

		},
		{
			id    : 'Pending',
			label : 'Pending',
			value : 25,
		},
		{
			id    : 'Closed',
			label : 'Closed',
			value : 20,
		},
	];

	return (
		<div className={styles.container}>
			<div className={cl`${styles.tile} ${styles.total_graph}`}>
				<div className={styles.total}>
					<div className={styles.graph}>
						<ResponsivePie
					// loading={loading}
							data={PieData}
							innerRadius={0.85}
							enableArcLinkLabels={false}
							enableArcLabels={false}
							colors={['#F8AEA8', '#FCDC00', '#E0E0E0', '#CED1ED']}
							colorBy="index"
							margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
							tooltip={({
								datum: { label = '', value = '' },
							}) => (
								<div className={styles.pie_tooltip}>
									<strong>
										{label}
										:
										{' '}
										{value}
									</strong>
								</div>
							)}
						/>
					</div>
					<div className={styles.legends}>
						{(PieData || []).map(({ label, isMargin }) => (
							<div className={cl`${styles.legend} ${isMargin ? styles.margin_bottom : ''}`} key={label}>
								<div className={styles.legend_count}>
									<div className={styles.dot} />
									<span className={styles.stats_count}>2000</span>
								</div>
								<div className={styles.stats_label}>{label}</div>
							</div>
						))}

					</div>
				</div>
			</div>
			{(statsIconsAndData || []).map(({ key, icon, label, count }, index) => {
				if (index > 4) return null;
				return (
					<div className={styles.tile} key={key}>
						<div>{icon}</div>
						<div className={styles.count}>{count}</div>
						<div className={styles.label}>{label}</div>
					</div>
				);
			})}
		</div>

	);
}

export default OverallStats;
