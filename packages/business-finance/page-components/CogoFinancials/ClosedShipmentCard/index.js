import { ResponsiveRadialBar } from '@cogoport/charts/radial-bar';
import { Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import React from 'react';

import RenderCardHeader from '../Common/RenderCardHeader';

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
		notation              : 'compact',
		maximumFractionDigits : 2,
	},
});

const formatDeviationPercentage = (value) => formatAmount({
	amount  : String(value),
	options : {
		style                 : 'decimal',
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
	setActiveBar = () => {},
	infoContent = '',
}) {
	const {
		currency,
	} = cardData;

	const totalCost = Number(cardData[`estimatedCost${taxType}`] || DEFAULT_VALUE);
	const totalRevenue = Number(cardData[`estimatedRevenue${taxType}`] || DEFAULT_VALUE);

	const data = getData({ taxType, type, cardData, totalCost, totalRevenue });

	const revenueDeviation = `${displayAmount(cardData[`actualRevenueDeviation${taxType}`], currency)}
	(${formatDeviationPercentage(cardData[`actualRevenueDeviationPercentage${taxType}`]) || DEFAULT_VALUE}%)
	`;

	const costDeviation = `${displayAmount(cardData[`actualCostDeviation${taxType}`], currency)}
   (${formatDeviationPercentage(cardData[`actualCostDeviationPercentage${taxType}`]) || DEFAULT_VALUE}%)
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

	const onCardClick = () => {
		setActiveShipmentCard(cardId);
		setActiveBar('');
	};

	return (
		<div className={styles.financially_closed_container}>
			{showHeading && (
				<div style={{ margin: '16px 32px' }}>
					<RenderCardHeader
						title={`${type} Closed Shipments`}
						showInfo
						infoContent={infoContent}
					/>
				</div>
			)}

			{!loading ? (
				<div
					className={styles.chart_data_combine}
					role="presentation"
					onClick={onCardClick}
					style={{ flexWrap: wrapElement ? 'wrap' : 'nowrap' }}
				>
					<div
						className={styles.responsive_graph_circular}
						style={{ height: isAdditonalView ? '186px' : null }}
					>
						<ResponsiveRadialBar
							data={data}
							valueFormat=">-.2f"
							padding={0}
							radialAxisStart={{ tickSize: 5, tickPadding: 5, tickRotation: 0 }}
							circularAxisOuter={{ tickSize: 5, tickPadding: 12, tickRotation: 0 }}
							endAngle="360"
							innerRadius={0.6}
							tooltip={({ bar = {} }) => {
								const { category, color, formattedValue } = bar;
								if (!category?.includes('Estimated')) {
									return (
										<div className={styles.tooltip}>
											<div className={styles.rect} style={{ backgroundColor: color }} />
											<div className={styles.val}>
												{toTitleCase(category || '')}
											</div>
											<div>
												{formattedValue}
												%
											</div>
										</div>
									);
								}
								return null;
							}}
							enableRadialGrid={false}
							enableCircularGrid={false}
							layers={['tracks', 'bars']}
							colors={['#ee3425', '#f8aea8', '#6fa5ab', '#cfeaed']}
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
										{child.show && (
											<div>
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
										)}
									</div>
								))}
							</div>
						))}

					</div>
				</div>
			) : (
				<div style={{ margin: '8px 0px', height: '70%' }}>
					<Placeholder height="100%" width="100%" />
				</div>
			)}

		</div>
	);
}

export default ClosedShipmentCard;
