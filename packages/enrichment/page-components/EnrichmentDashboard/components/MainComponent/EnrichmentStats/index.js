import { ResponsivePie } from '@cogoport/charts/pie';
import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { IcMUpwardGraph } from '@cogoport/icons-react';

import getPieChartData from '../../../configurations/get-pie-chart-data';

import styles from './styles.module.css';

function EnrichmentStats(props) {
	const { stats = {}, loadingStats = false } = props;

	const pieChartData = getPieChartData({ stats });

	const isEmpty = Object.values(stats).every((item) => item === GLOBAL_CONSTANTS.zeroth_index);

	if (loadingStats) {
		return (

			<div className={styles.container}>
				<div style={{ width: '50%' }}>
					<Placeholder
						type="circle"
						radius="163px"
						margin="38px 288px 38px"
					/>
				</div>
				<div style={{ width: '50%' }}>

					<Placeholder
						type="circle"
						radius="163px"
						margin="38px 288px 38px"
					/>
				</div>

			</div>

		);
	}

	if (isEmpty && !loadingStats) {
		return (
			<section className={styles.empty_container}>
				<div className={styles.empty_text}>
					<IcMUpwardGraph width={100} height={100} style={{ marginBottom: '16px' }} />
					Statistics are not available at this moment.
				</div>
			</section>
		);
	}

	return (
		<section className={styles.container}>

			{Object.values(pieChartData).map((chartData) => (

				<div key={chartData} className={styles.chart_container}>
					<div className={styles.chart_title}>{chartData.title}</div>

					<ResponsivePie
						data={chartData.data}
						innerRadius={0}
						padAngle={0}
						cornerRadius={0}
						activeOuterRadiusOffset={4}
						enableArcLabels={false}
						enableArcLinkLabels={false}
						isInteractive
						colors={chartData.colors}
						colorBy="index"
						margin={{ top: 5, right: 40, bottom: 72, left: 120 }}
						legends={[
							{
								anchor        : 'bottom',
								direction     : 'column',
								justify       : false,
								translateX    : -240,
								translateY    : -20,
								itemsSpacing  : 10,
								itemWidth     : 80,
								itemHeight    : 18,
								itemTextColor : '#999',
								itemDirection : 'left-to-right',
								itemOpacity   : 1,
								symbolSize    : 12,
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
			))}

		</section>
	);
}

export default EnrichmentStats;
