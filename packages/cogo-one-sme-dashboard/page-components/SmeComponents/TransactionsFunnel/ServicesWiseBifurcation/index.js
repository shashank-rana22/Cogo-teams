import { ResponsivePie } from '@cogoport/charts/pie';
import { startCase } from '@cogoport/utils';
import React from 'react';

import { LoadingState } from '../../../../common/Elements';
import useSmeDashboardStats from '../../../../hooks/useSmeDashboardStats';

import styles from './styles.module.css';

function ServicesWiseBifurcation({
	widgetBlocks = null,
	filterParams = {},
}) {
	const {
		dashboardData = {},
		dashboardLoading = false,
	} = useSmeDashboardStats({ widgetBlocks, filterParams });

	const { service_wise_bifurcation_data = [] } = dashboardData || {};

	const updatedData = (service_wise_bifurcation_data || [])?.map(
		(itm) => ({
			id    : itm?.shipment_type,
			value : itm?.count,
			label : startCase(itm?.shipment_type),
			color : `#${Math.floor(Math.random() * 16777215).toString(16)}`,
		}),
	);

	if (dashboardLoading) {
		<div className={styles.container}>
			<div className={styles.header}>
				Services Wise Bifurcation
			</div>
			<LoadingState />
		</div>;
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				Services Wise Bifurcation
			</div>

			<div className={styles.graph_container}>
				<div className={styles.pie_chart}>
					<ResponsivePie
						data={updatedData}
						margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
						padAngle={0.7}
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
						colors={updatedData.map((itm) => itm?.color)}
					/>
				</div>
				<div className={styles.legends_container}>
					{updatedData.map(
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
			<div className={styles.footer}>
				<div className={styles.footer_item}>
					<div className={styles.footer_item_label}>
						Only Primary Service Sold
					</div>
					<div className={styles.footer_item_value}>
						50
					</div>
				</div>
				<div className={styles.footer_item}>
					<div className={styles.footer_item_label}>
						Primary + AddOn Service Sold
					</div>
					<div className={styles.footer_item_value}>
						30
					</div>
				</div>
			</div>
		</div>
	);
}

export default ServicesWiseBifurcation;
