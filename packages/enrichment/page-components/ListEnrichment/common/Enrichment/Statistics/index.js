import { ResponsivePie } from '@cogoport/charts/pie';
import { startCase } from '@cogoport/utils';

import getPieChartData from '../../../../../configurations/get-pie-chart-data';
import useEnrichmentStats from '../../../hooks/useEnrichmentStats';

import styles from './styles.module.css';

function Statistics() {
	const { stats = {}, loading = false } = useEnrichmentStats();

	const pieChartData = getPieChartData({ stats });

	const isEmpty = Object.values(stats).every((item) => item === 0);

	if (isEmpty && !loading) {
		return (
			<section className={styles.empty_container}>
				<div className={styles.empty_text}>Pie Statistics Not Found !!!</div>
			</section>
		);
	}

	return (
		<section className={styles.container}>
			{Object.values(pieChartData).map((chartData) => (
				<div className={styles.chart_container}>
					<div className={styles.chart_title}>{chartData.title}</div>

					<ResponsivePie
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
			))}
		</section>
	);
}

export default Statistics;
