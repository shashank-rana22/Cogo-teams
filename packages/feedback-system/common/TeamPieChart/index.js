import { ResponsivePie } from '@cogoport/charts/pie';
import { startCase } from '@cogoport/utils';

import useGetPieChartStats from '../../hooks/useGetPieChartStats';
import EmptyState from '../EmptyState';

import styles from './styles.module.css';

function TeamPieChart({ userId = '', params = {} }) {
	const {
		userData = {}, loading = false,
	} = useGetPieChartStats({ userId, params });

	const chart_data = [
		{
			id    : 'above_average',
			label : 'Above Average',
			value : userData.above_average,
		},
		{
			id    : 'average',
			label : 'Average',
			value : userData.average,
		},
		{
			id    : 'below_average',
			label : 'Below Average',
			value : userData.below_average,
		},
	];

	let isEmpty = 0;
	Object.values(userData).forEach((val) => { isEmpty += val; });

	if (isEmpty === 0 && !loading) {
		return (
			<div className={styles.empty_container}>
				<EmptyState
					height={140}
					width={220}
					emptyText="Rating Stats Not Found"
					textSize="12px"
					flexDirection="column"
				/>
			</div>
		);
	}

	return (
		<div className={styles.pie_container}>
			<ResponsivePie
				data={chart_data}
				innerRadius={0}
				activeOuterRadiusOffset={8}
				enableArcLinkLabels={false}
				enableArcLabels={false}
				colors={['#9BEFA8', '#67C676', '#CDF7D4']}
				colorBy="index"
				margin={{ top: 10, right: 40, bottom: 80, left: 40 }}
				legends={[
					{
						anchor        : 'bottom-left',
						direction     : 'column',
						justify       : false,
						translateX    : 60,
						translateY    : 60,
						itemsSpacing  : 5,
						itemWidth     : 100,
						itemHeight    : 18,
						itemTextColor : '#999',
						itemDirection : 'left-to-right',
						itemOpacity   : 1,
						symbolSize    : 16,
						symbolShape   : 'square',
					},
				]}
				tooltip={({
					datum: { id, value },
				}) => (
					<div className={styles.pie_tooltip}>
						<strong>
							{startCase(id)}
							{' '}
							:
							{' '}
							{value}
						</strong>
					</div>
				)}
			/>
		</div>

	);
}

export default TeamPieChart;
