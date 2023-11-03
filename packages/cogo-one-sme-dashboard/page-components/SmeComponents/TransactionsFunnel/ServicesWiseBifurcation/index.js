import { ResponsivePie } from '@cogoport/charts/pie';
import React from 'react';

import styles from './styles.module.css';

const data = [
	{
		id    : 'fcl_import',
		label : 'FCL Import',
		value : 20,
		color : '#88CAD1',
	},
	{
		id    : 'fcl_export',
		label : 'FCL Export',
		value : 15,
		color : '#FDE74D',
	},
	{
		id    : 'lcl_import',
		label : 'LCL Import',
		value : 5,
		color : '#F9AE64',
	},
	{
		id    : 'lcl_Export',
		label : 'LCL Export',
		value : 5,
		color : '#F2E3C3',
	},
	{
		id    : 'air_import',
		label : 'AIR Import',
		value : 6,
		color : '#ABCD62',
	},
	{
		id    : 'air_export',
		label : 'AIR Export',
		value : 2,
		color : '#ABB0DE',
	},
	{
		id    : 'air_customs',
		label : 'AIR Customs',
		value : 2,
		color : '#CFEAED',
	},
	{
		id    : 'ocean_customs',
		label : 'Ocean Customs',
		value : 1,
		color : '#F3FAFA',
	},
	{
		id    : 'trucking',
		label : 'Trucking',
		value : 0,
		color : '#FEF3E9',
	},
	{
		id    : 'insurance',
		label : 'Insurance',
		value : 0,
		color : '#F7FAEF',
	},
];

function ServicesWiseBifurcation() {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				Services Wise Bifurcation
			</div>

			<div className={styles.graph_container}>
				<div className={styles.pie_chart}>
					<ResponsivePie
						data={data}
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
						colors={data.map((itm) => itm?.color)}
					/>
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
			<div className={styles.footer}>
				<div className={styles.footer_item}>
					<div className={styles.footer_item_label}>
						SAAS Subscription Sold
					</div>
					<div className={styles.footer_item_value}>
						20
					</div>
				</div>
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
