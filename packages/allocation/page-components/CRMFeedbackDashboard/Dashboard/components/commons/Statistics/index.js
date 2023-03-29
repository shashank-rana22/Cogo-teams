import { ResponsivePie } from '@cogoport/charts/pie';
import { startCase } from '@cogoport/utils';

import useChartStats from '../../../../hooks/useChartStats';

import getStatsData from './get-stats-data';
import styles from './styles.module.css';

function Statistics({ activeTab = '' }) {
	const { stats = {}, loading = false } = useChartStats({ activeTab });
	const statsControl = getStatsData(activeTab, stats);

	const isEmpty = Object.values(stats).every((item) => item === 0);

	if (isEmpty && !loading) {
		return (
			<section className={styles.empty_container}>
				<div className={styles.empty_text}>Statistics are not available.</div>
			</section>
		);
	}

	return (
		<section className={styles.container}>
			{Object.values(statsControl).map((chartData) => (
				<div className={styles.chart_container}>
					<div className={styles.chart_title}>{chartData.title}</div>
					<div className={styles.single_chart_container}>
						<ResponsivePie
							loading={loading}
							data={chartData.data}
							innerRadius={0}
							activeOuterRadiusOffset={4}
							enableArcLinkLabels={false}
							enableArcLabels={false}
							colors={chartData.colors}
							colorBy="index"
							margin={{ top: 5, right: 40, bottom: 72, left: 120 }}
							legends={[
								{
									anchor        : 'left',
									direction     : 'column',
									justify       : false,
									translateX    : -80,
									translateY    : 0,
									itemsSpacing  : 5,
									itemWidth     : 100,
									itemHeight    : 18,
									itemTextColor : '#221F20',
									itemDirection : 'left-to-right',
									itemOpacity   : 1,
									symbolSize    : 12,
									symbolShape   : 'circle',
									effects       : [
										{
											on    : 'hover',
											style : {
												itemTextColor: 'red',
											},
										},
									],
								},
							]}
							tooltip={({
								datum: { id, value },
							}) => (
								<div className={styles.pie_tooltip}>
									<strong>
										{startCase(id)}
										:
										{' '}
										{value}
									</strong>
								</div>
							)}
						/>
					</div>

				</div>
			))}
		</section>
	);
}

export default Statistics;
