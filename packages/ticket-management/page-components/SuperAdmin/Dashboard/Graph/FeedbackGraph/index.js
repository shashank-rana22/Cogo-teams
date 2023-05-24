import { ResponsivePie } from '@cogoport/charts/pie/index';
import { cl } from '@cogoport/components';

import styles from './styles.module.css';

function FeedbackGraph() {
	const PieData = [
		{
			id    : 'happy_customers',
			label : 'Happy Customers',
			value : 20,
		},
		{
			id    : 'neutral_customers',
			label : 'Escalated Customers',
			value : 10,

		},
		{
			id    : 'angry_customers',
			label : 'Angry Customers',
			value : 70,
		},
	];

	return (
		<div className={styles.container}>
			<div className={styles.graph}>
				<ResponsivePie
					data={PieData}
					innerRadius={0.8}
					enableArcLinkLabels={false}
					enableArcLabels={false}
					colors={['#FEF199', '#CFEAED', '#FDEBE9']}
					colorBy="index"
					startAngle={-90}
					endAngle={90}
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
					<span className={styles.graph_count}>8.4k</span>
					<span className={styles.graph_label}>Total No. of Customers</span>
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

export default FeedbackGraph;
