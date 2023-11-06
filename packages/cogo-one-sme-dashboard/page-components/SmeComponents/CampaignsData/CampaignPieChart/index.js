import { ResponsivePie } from '@cogoport/charts/pie';
import React from 'react';

import { LoadingState } from '../../../../common/Elements';
import { campaignChartConstants } from '../../../../constants/campaignConstants';
import useSmeDashboardStats from '../../../../hooks/useSmeDashboardStats';

import styles from './styles.module.css';

function CampaignPieChart({
	widgetBlocks = null,
	filterParams = {},
}) {
	const {
		dashboardData = {},
		dashboardLoading = false,
	} = useSmeDashboardStats({ widgetBlocks, filterParams });

	const { total_campaigns_data = {} } = dashboardData || {};

	const campaignsData = campaignChartConstants.map(
		(itm) => ({
			...itm,
			value: total_campaigns_data?.[itm?.id] || 0,
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
				{total_campaigns_data?.total_live || 0}
			</text>

		);
	}

	if (dashboardLoading) {
		return (
			<div className={styles.container}>
				<div className={styles.header}>
					Total Campaigns
				</div>
				<div className={styles.loading_container}>
					<LoadingState loaderCount={30} />
				</div>
			</div>
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
						data={campaignsData}
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
						layers={['arcs', 'arcLabels', 'arcLinkLabels', 'legends', CenteredMetric]}
						colors={campaignsData.map((itm) => itm?.color)}
					/>
				</div>
			</div>

			<div className={styles.legends_container}>
				{campaignsData.map(
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
