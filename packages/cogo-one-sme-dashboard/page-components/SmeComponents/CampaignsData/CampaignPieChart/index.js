import { ResponsivePie } from '@cogoport/charts/pie';
import React from 'react';

import styles from './styles.module.css';

const data = [
	{
		id    : 'fcl_import',
		label : 'Active Campaigns',
		value : 20,
		color : '#ACDADF',
	},
	{
		id    : 'fcl_export',
		label : 'New Journey’s Created',
		value : 15,
		color : '#C4DC91',
	},
	{
		id    : 'lcl_import',
		label : 'Live Journey’s',
		value : 5,
		color : '#F9AE64',
	},
	{
		id    : 'lcl_Export',
		label : 'Previous Journey’s Updated',
		value : 5,
		color : '#F2E3C3',
	},
];
function CampaignPieChart() {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				Total Campaigns
			</div>

			<div className={styles.pie_chart_container}>
				<div className={styles.pie_chart_body}>
					<ResponsivePie
						data={data}
						margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
						padAngle={0.7}
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
						colors={data.map((itm) => itm?.color)}
					/>
				</div>
			</div>

			<div className={styles.legends_container}>
				{data.map(
					(itm) => (
						<div
							key={itm?.id}
							className={styles.legend_item}
						>
							<div className={styles.legend_item_name}>
								<div className={styles.legends_circle} style={{ backgroundColor: itm?.color }} />
								<div>{itm?.label}</div>
							</div>
							<div className={styles.legends_value}>{itm?.value}</div>
						</div>
					),
				)}
			</div>

		</div>
	);
}

export default CampaignPieChart;
