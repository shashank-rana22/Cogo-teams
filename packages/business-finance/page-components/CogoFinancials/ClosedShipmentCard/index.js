import { ResponsiveRadialBar } from '@cogoport/charts/radial-bar';
import { Placeholder, cl } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

import RenderCardHeader from '../Common/RenderCardHeader';
import { LABEL_MAPPING } from '../constants';

import { getData } from './getData';
import { getGraphData } from './getGraphData';
import styles from './styles.module.css';

const DEFAULT_VALUE = 0;
const FIRST_INDEX = 1;

const displayAmount = (amount, currency) => formatAmount({
	amount,
	currency,
	options: {
		style                 : 'currency',
		currencyDisplay       : 'code',
		maximumFractionDigits : 2,
	},
});

export const toTitleCase = (str) => {
	const titleCase = str
		.toLowerCase()
		.split(' ')
		.map((word) => word.charAt(GLOBAL_CONSTANTS.zeroth_index).toUpperCase() + word.slice(FIRST_INDEX))
		.join(' ');

	return titleCase;
};

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

	const totalCost = Number(cardData[`estimatedCost${taxType}`] || DEFAULT_VALUE)
		+ Number(cardData[`${LABEL_MAPPING[type]}Cost${taxType}`] || DEFAULT_VALUE);
	const totalRevenue = Number(cardData[`estimatedRevenue${taxType}`] || DEFAULT_VALUE)
		+ Number(cardData[`${LABEL_MAPPING[type]}Revenue${taxType}`] || DEFAULT_VALUE);

	const data = getData({ taxType, type, cardData, totalCost, totalRevenue });

	const revenueDeviation = `${displayAmount(cardData[`actualRevenueDeviation${taxType}`], currency)}
	(${cardData[`actualRevenueDeviationPercentage${taxType}`] || DEFAULT_VALUE}%)
	`;

	const costDeviation = `${displayAmount(cardData[`actualCostDeviation${taxType}`], currency)}
   (${cardData[`actualCostDeviationPercentage${taxType}`] || DEFAULT_VALUE}%)
   `;

	const graphData = getGraphData({
		cardData,
		taxType,
		currency,
		type,
		displayAmount,
		isDeviationVisible,
		revenueDeviation,
		costDeviation,
	});

	return (
		<div className={styles.financially_closed_container}>
			{showHeading && (
				<div style={{ marginBottom: '16px' }}>
					<RenderCardHeader
						title={`${type} Closed Shipments`}
						showInfo
					/>
				</div>
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
						style={{ height: isAdditonalView ? '186px' : null }}
					>
						<ResponsiveRadialBar
							data={data}
							cornerRadius={40}
							valueFormat=">-.2f"
							padding={0}
							radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
							circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
							endAngle="360"
							innerRadius={0.6}
							tooltip={({ bar = {} }) => {
								const group = bar?.groupId === 'Revenue' ? totalRevenue : totalCost;
								return (
									<div className={styles.tooltip}>
										<div className={styles.rect} style={{ backgroundColor: bar?.color }} />
										<div className={styles.val}>
											{toTitleCase(bar?.category || '')}
										</div>
										<div>
											{formatAmount({
												amount  : (Number(bar.value) * group),
												currency,
												options : {
													style                 : 'currency',
													currencyDisplay       : 'code',
													maximumFractionDigits : 2,
												},
											})}
										</div>
									</div>
								);
							}}
							enableRadialGrid={false}
							enableCircularGrid={false}
							layers={['tracks', 'bars']}
							colors={['#f8aea8', '#ee3425', '#cfeaed', '#6fa5ab']}
						/>

					</div>
					<div className={styles.show_graph_data}>
						{(graphData || []).map((item) => (
							<div
								key={item?.id}
								className={styles.graph_row}
							>
								{(item.children || []).map((child) => (
									<div key={child.label}>
										<div
											className={styles.graph_label}
										>
											{child.color && (
												<span
													className={styles.label_circle}
													style={{ backgroundColor: child.color }}
												/>
											)}
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
