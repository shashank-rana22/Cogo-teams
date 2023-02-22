import { ResponsivePie } from '@cogoport/charts/pie';

import useGetPieChartStats from '../../hooks/useGetPieChartStats';
import EmptyState from '../EmptyState';

import styles from './styles.module.css';

function TeamPieChart({ userId = '', month = '', year = '' }) {
	const {
		loading,
		userData,
	} = useGetPieChartStats({ userId, month, year });

	const chart_data = [
		{
			id    : 'above_average',
			label : 'Above Average',
			value : 23,
		},
		{
			id    : 'average',
			label : 'Average',
			value : 13,
		},
		{
			id    : 'below_average',
			label : 'Below Average',
			value : 3,
		},
	];

	return (
		<div className={styles.pie_container}>
			{(!loading
			// && !(userData.above_average || userData.average || userData.below_average)
			)
				? (
					<ResponsivePie
						data={chart_data}
						innerRadius={0}
						padAngle={0.7}
						activeOuterRadiusOffset={8}
						enableArcLinkLabels={false}
						enableArcLabels={false}
						colors={['#9BEFA8', '#67C676', '#CDF7D4']}
						colorBy="index"
						margin={{ top: 10, right: 20, bottom: 80, left: 20 }}
						legends={[
							{
								anchor        : 'bottom-left',
								direction     : 'column',
								justify       : false,
								translateX    : 0,
								translateY    : 56,
								itemsSpacing  : 0,
								itemWidth     : 100,
								itemHeight    : 18,
								itemTextColor : '#999',
								itemDirection : 'left-to-right',
								itemOpacity   : 1,
								symbolSize    : 18,
								symbolShape   : 'circle',
								effects       : [
									{
										on    : 'hover',
										style : {
											itemTextColor: '#000',
										},
									},
								],
							},
						]}
					/>
				) : (
					<div className={styles.empty_container}>
						<EmptyState
							height={140}
							width={220}
							emptyText="Pie Stats Not Found"
							textSize="12px"
							flexDirection="column"
						/>
					</div>
				)}
		</div>

	);
}

export default TeamPieChart;
