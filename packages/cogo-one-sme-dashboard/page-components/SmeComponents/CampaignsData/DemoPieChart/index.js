import { ResponsivePie } from '@cogoport/charts/pie';
import React from 'react';

import { DemoConstants } from '../../../../constants/DemoConstants';

import DUMMY_DATA from './dummyData';
import styles from './styles.module.css';

function DemoPieChart() {
	const demoData = DemoConstants.map(
		(itm) => ({
			...itm,
			value: DUMMY_DATA?.[itm?.id] || 0,
		}),
	);

	function CenteredMetric({ centerX = 0, centerY = 0 }) {
		return (
			<text
				x={centerX}
				y={centerY}
				textAnchor="middle"
				dominantBaseline="central"
				className={styles.style_component_text}
			>
				{demoData.reduce((acc, itm) => acc + (itm?.value || 0), 0)}
			</text>

		);
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				Total Campaigns
			</div>

			<div className={styles.pie_chart_container}>
				<div className={styles.pie_chart_body}>
					<ResponsivePie
						data={demoData}
						margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
						innerRadius={0.55}
						activeOuterRadiusOffset={8}
						borderColor={{ theme: 'background' }}
						enableArcLinkLabels={false}
						arcLinkLabelsSkipAngle={10}
						arcLinkLabelsTextColor="#333333"
						arcLinkLabelsThickness={2}
						arcLinkLabelsColor={{ from: 'color' }}
						arcLabelsSkipAngle={15}
						transitionMode="startAngle"
						legends={[]}
						layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', CenteredMetric]}
						colors={demoData.map((itm) => itm?.color)}
					/>
				</div>

				<div className={styles.legends_container}>
					{demoData.map(
						(itm) => (
							<div
								key={itm?.id}
								className={styles.legend_item}
							>
								<div
									className={styles.legends_circle}
									style={{ backgroundColor: itm?.color }}
								/>
								<div className={styles.legend_item_name}>
									<div>{itm?.label}</div>
									<div className={styles.legends_value}>{itm?.value}</div>
								</div>
							</div>
						),
					)}
				</div>
			</div>

			<div className={styles.coming_soon}>
				Coming Soon...
			</div>
		</div>
	);
}

export default DemoPieChart;
