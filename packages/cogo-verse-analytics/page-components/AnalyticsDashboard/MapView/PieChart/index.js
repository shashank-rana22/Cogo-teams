import { ResponsivePie } from '@cogoport/charts/pie';
import React from 'react';

import PieChartData from '../../../../configurations/total-communications-data';
import { imgURL } from '../../../../constants/image-urls';

import styles from './styles.module.css';

function CommunicationPieChart({ conversation_data = {} }) {
	const colors = ['#BDBDBD', '#ABCD62', '#DDEBC0'];
	const chartData = PieChartData({ conversation_data });

	return (
		<div className={styles.pie_chart_content}>
			{Object.values(conversation_data).some((i) => i > 0)
				? (
					<ResponsivePie
						data={chartData || []}
						margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
						valueFormat=" >-"
						innerRadius={0.7}
						padAngle={2}
						cornerRadius={2}
						activeInnerRadiusOffset={5}
						colors={colors}
						enableArcLinkLabels={false}
						arcLinkLabelsSkipAngle={10}
						arcLinkLabelsTextColor="#333333"
						arcLinkLabelsThickness={2}
						arcLinkLabelsColor={colors}
						enableArcLabels={false}
						arcLabelsSkipAngle={10}
						arcLabelsTextColor={{
							from   	  : colors,
							modifiers : [['darker', 2]],
						}}
						defs={[
							{
								id         : 'dots',
								type   	   : 'patternDots',
								background : 'inherit',
								color      : 'rgba(255, 255, 255, 0.3)',
								size       : 4,
								padding    : 1,
								stagger    : true,
							},
							{
								id         : 'lines',
								type       : 'patternLines',
								background : 'inherit',
								color      : 'rgba(255, 255, 255, 0.3)',
								rotation   : -45,
								lineWidth  : 6,
								spacing    : 10,
							},
						]}
						legends={[]}
					/>
				) : (
					<div className={styles.no_data_found}>
						<img src={imgURL.empty_2} alt="no data" width="100px" />
					</div>
				)}
		</div>

	);
}

export default CommunicationPieChart;
