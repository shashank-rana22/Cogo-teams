import { ResponsivePie } from '@cogoport/charts/pie';
import { startCase } from '@cogoport/utils';

import EmptyState from '../../../../common/EmptyState';
import getPieChartData from '../../../../configurations/get-pie-chart-data';
import useEnrichmentStats from '../../hooks/useEnrichmentStats';

import styles from './styles.module.css';

function Statistics() {
	const { stats = {}, loading = false } = useEnrichmentStats();

	const pieChartData = getPieChartData({ stats });

	const isEmpty = Object.values(stats).every((item) => item === 0);

	if (isEmpty && !loading) {
		return (
			<div className={styles.empty_container}>
				<EmptyState
					height={140}
					width={220}
					emptyText="Pie Stats Not Found"
					textSize="12px"
					flexDirection="column"
				/>
			</div>
		);
	}

	return (
		<div className={styles.container}>

			{
				Object.values(pieChartData).map((chartData) => (
					<ResponsivePie
						data={chartData.data}
						innerRadius={0}
						activeOuterRadiusOffset={8}
						enableArcLinkLabels={false}
						enableArcLabels={false}
						colors={chartData.colors}
						colorBy="index"
						margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
						legends={[
							{
								anchor        : 'left',
								direction     : 'column',
								justify       : false,
								translateX    : 0,
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
				))
			}

		</div>
	);
}

export default Statistics;
