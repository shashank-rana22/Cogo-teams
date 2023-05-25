import { ResponsivePie } from '@cogoport/charts/pie/index';
import { cl } from '@cogoport/components';

import styles from './styles.module.css';

function TicketGraph() {
	const PieData = [
		{
			id       : 'open',
			label    : 'Open',
			value    : 25,
			isMargin : true,
		},
		{
			id       : 'escalated',
			label    : 'Escalated',
			value    : 30,
			isMargin : true,

		},
		{
			id    : 'pending',
			label : 'Pending',
			value : 25,
		},
		{
			id    : 'closed',
			label : 'Closed',
			value : 20,
		},
	];
	return (
		<div className={styles.container}>
			<div className={styles.graph}>
				<ResponsivePie
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
				<div className={styles.graph_total}>
					<span className={styles.graph_label}>No. of Tickets</span>
					<span className={styles.graph_count}>8.4k</span>
				</div>
			</div>
			<div className={styles.legends}>
				{(PieData || []).map(({ id, label, value }) => (
					<div className={styles.legend} key={id}>
						<div className={styles.legend_count}>
							<div className={cl`${styles.dot} ${styles[id]}`} />
							<span className={styles.stats_count}>{value}</span>
						</div>
						<div className={styles.stats_label}>{label}</div>
					</div>
				))}
			</div>
		</div>

	);
}

export default TicketGraph;
