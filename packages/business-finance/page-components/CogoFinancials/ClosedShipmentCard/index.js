import { ResponsiveRadialBar } from '@cogoport/charts/radial-bar';
import { Placeholder, cl } from '@cogoport/components';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { startCase } from '@cogoport/utils';
import React from 'react';

import RenderCardHeader from '../Common/RenderCardHeader';

import styles from './styles.module.css';

const LABEL_MAPPING = {
	Financially   : 'actual',
	Operationally : 'operational',
};

const displayAmount = (amount, currency) => formatAmount({
	amount,
	currency,
	options: {
		style                 : 'currency',
		currencyDisplay       : 'code',
		maximumFractionDigits : 2,
	},
});

function ClosedShipmentCard({
	isDeviationVisible = true, type = '',
	cardId = '', setActiveShipmentCard = () => { },
	isAdditonalView = false,
	showHeading = true,
	wrapElement = false,
	cardData = [],
	loading = false,
	taxType = '',
}) {
	const {
		currency,
	} = cardData;

	const data = [
		{
			id   : 'Cost',
			data : [
				{
					x : 'Estimated Cost',
					y : cardData[`estimatedCost${taxType}`],
				},
				{
					x : `${LABEL_MAPPING[type]} Cost`,
					y : cardData[`${LABEL_MAPPING[type]}Cost${taxType}`],
				},
			],
		},
		{
			id   : 'Revenue',
			data : [
				{
					x : 'Estimated Revenue',
					y : cardData[`estimatedRevenue${taxType}`],
				},
				{
					x : `${LABEL_MAPPING[type]} Revenue`,
					y : cardData[`${LABEL_MAPPING[type]}Revenue${taxType}`],
				},
			],
		},

	];

	const graphData = [
		{
			rowId    : 'first_row',
			children : [
				{
					label : 'Estimated Revenue',
					value : displayAmount(cardData[`estimatedRevenue${taxType}`], currency),
					color : '#cfeaed',
				},
				{
					label : 'Estimated Cost',
					value : displayAmount(cardData[`estimatedCost${taxType}`], currency),
					color : '#f8aea8',
				},
			],
		},
		{
			rowId    : 'second_row',
			children : [
				{
					label : `${startCase(LABEL_MAPPING[type])} Revenue`,
					value : displayAmount(cardData[`${LABEL_MAPPING[type]}Revenue${taxType}`], currency),
					color : '#6fa5ab',
				},
				{
					label : `${startCase(LABEL_MAPPING[type])} Cost`,
					value : displayAmount(cardData[`${LABEL_MAPPING[type]}Cost${taxType}`], currency),
					color : '#ee3425',
				},
			],
		},

	];

	const revenueDeviation = `${displayAmount(cardData[`actualRevenueDeviation${taxType}`], currency)}
	(${cardData[`actualRevenueDeviationPercentage${taxType}`]}%)
   `;

	const costDeviation = `${displayAmount(cardData[`actualCostDeviation${taxType}`], currency)}
   (${cardData[`actualCostDeviationPercentage${taxType}`]}%)
   `;

	const updateGraphData = isDeviationVisible
		? [...graphData,
			{
				rowId    : 'third_row',
				children : [
					{
						label : 'Deviation(Revenue)',
						value : revenueDeviation,
						color : 'null',
					},
					{
						label : 'Deviation(Cost)',
						value : costDeviation,
						color : 'null',
					},
				],
			},
		]
		: graphData;

	return (
		<div className={styles.financially_closed_container}>
			{showHeading && (
				<RenderCardHeader
					title={`${type} Closed Shipments`}
					showInfo
				/>
			)}

			{!loading ? (
				<div
					className={cl`${styles.chart_data_combine} 
					${!isDeviationVisible ? styles.additional_margin : null}`}
					role="presentation"
					onClick={() => setActiveShipmentCard(cardId)}
					style={{ flexWrap: wrapElement ? 'wrap' : 'nowrap' }}
				>
					<div
						className={styles.responsive_graph_circular}
						style={{ height: isAdditonalView ? '200px' : null }}
					>
						<ResponsiveRadialBar
							data={data}
							valueFormat=">-.2f"
							padding={0}
							cornerRadius={2}
							radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
							circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
							endAngle="360"
							innerRadius={0.6}
							enableRadialGrid={false}
							enableCircularGrid={false}
							layers={['tracks', 'bars']}
							colors={['#f8aea8', '#ee3425', '#cfeaed', '#6fa5ab']}
						/>

					</div>
					<div className={styles.show_graph_data}>
						{updateGraphData.map((item) => (
							<div
								key={item?.id}
								className={styles.graph_row}
							>
								{(item.children || []).map((child) => (
									<div key={child.label}>
										<div className={styles.graph_label}>
											<span
												className={styles.label_circle}
												style={{ backgroundColor: child.color }}
											/>
											{child.label}
										</div>
										<div className={styles.graph_value}>
											{child.value}
										</div>
									</div>
								))}
							</div>
						))}
					</div>
				</div>
			) : (
				<div style={{ margin: '8px 0px' }}>
					<Placeholder height={200} width="100%" />
				</div>
			)}

		</div>
	);
}

export default ClosedShipmentCard;
