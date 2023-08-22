import { Button, Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty } from '@cogoport/utils';
import dynamic from 'next/dynamic';
import React, { useState, useEffect, useContext } from 'react';

import { INFO_CONTENT, LABEL_MAPPING } from '../../constants';
import { TourContext } from '../Contexts';
import RenderCardHeader from '../RenderCardHeader';
import MyResponsiveBar from '../ResponsiveBar';
import { TOUR_COMMON_PROPS } from '../tourCommonProps';
import { CLOSED_PARENT_SERVICES_STEPS } from '../tourSteps';

import styles from './styles.module.css';

const Tour = dynamic(
	() => import('reactour'),
	{ ssr: false },
);

const BOTTOM_AXIS_ROTATION = 20;
const DEFAULT_ROTATION = 0;
const STRAIGHT_AXIS_LIMIT = 2;
const MINIMUM_POSITIVE = 0;
const MID_GRAPH_INDEX = 1;
const MAX_ANIMATION_TIME = 500;

const KEY_MAPPINGS = {
	'Operational Profitability' : 'Profitability',
	Revenue                     : 'Revenue',
	Expense                     : 'Cost',
};

const defaultAmountFormat = (value) => formatAmount({
	amount  : String(value),
	options : {
		style                 : 'decimal',
		notation              : 'compact',
		maximumFractionDigits : 2,
	},
});

const formatPercentageLabel = (value) => `${formatAmount({
	amount  : String(value),
	options : {
		style                 : 'decimal',
		notation              : 'compact',
		maximumFractionDigits : 0,
	},
})}%`;

function SingleGraphCard({
	heading = '',
	setActiveBar = () => {},
	activeBar = '',
	isViewDetailsVisible = false,
	onViewDetails = () => { },
	taxType = '',
	type = '',
	serviceLevelData = [],
	serviceLevelLoading = false,
	defaultWidth = '300',
	showShipmentList = false,
	graphIndex = 0,
}) {
	const { tour, setTour, setIsTourInitial } = useContext(TourContext);
	const [isAnimationCompleted, setIsAnimationCompleted] = useState(false);
	const isLastView = isViewDetailsVisible; // last view of graph cards
	const graphKey = heading;

	const graphCurrency = serviceLevelData?.[GLOBAL_CONSTANTS.zeroth_index]?.currency || '';
	const verticalLabel = (heading === 'Operational Profitability') ? 'Percentage ( % )'
		: `Amount ( ${graphCurrency} )`;

	const onBarClick = (e) => {
		if (!isLastView) { setActiveBar(e?.indexValue); }
	};

	// formatting bottom axis labels  ¯¯\_(ツ)_/¯¯
	const formattedServiceLevelData = serviceLevelData.map((item) => {
		const singleItem = { ...item };
		const { serviceName } = singleItem || {};

		const newServiceName = serviceName.replaceAll('_', ' ');

		return {
			...item,
			serviceName: newServiceName,
		};
	});

	const getColors = ({ id, value }) => {
		if (id?.includes('estimated')) {
			if (value > MINIMUM_POSITIVE) {
				return '#cfeaed'; // light blue
			}
			return '#f8aea8'; // light red
		}
		if (value > MINIMUM_POSITIVE) {
			return '#6fa5ab'; // dark blue
		}
		return '#f37166'; // dark red
	};

	useEffect(() => {
		setTimeout(() => {
			setIsAnimationCompleted(true);
		}, MAX_ANIMATION_TIME); // waiting for animation to complete first
	}, []);

	return (
		<div className={styles.container}>
			{isAnimationCompleted && graphIndex === MID_GRAPH_INDEX && (
				<Tour
					steps={CLOSED_PARENT_SERVICES_STEPS}
					isOpen={tour && isEmpty(activeBar)}
					onRequestClose={() => {
						setTour(false);
						setIsTourInitial(true);
					}}
					{...TOUR_COMMON_PROPS}
				/>
			)}
			{!serviceLevelLoading && (
				<div className={styles.flexhead}>
					<RenderCardHeader
						title={heading}
						showInfo
						infoContent={INFO_CONTENT.closedShipmentsBar}
					/>
					{isViewDetailsVisible && !showShipmentList && (
						<Button
							themeType="secondary"
							onClick={onViewDetails}
						>
							View Details
						</Button>
					)}
				</div>
			)}

			<div
				style={{
					minWidth: `${defaultWidth}px`,

				}}
				className={styles.graph}
			>
				{!serviceLevelLoading ? (
					<div data-tour={graphIndex === MID_GRAPH_INDEX
						? 'closed-single-parent-bar' : null}
					>
						{!isEmpty(formattedServiceLevelData) ? (
							<MyResponsiveBar
								data={formattedServiceLevelData}
								keys={[
									`estimated${KEY_MAPPINGS?.[graphKey]}${taxType}`,
									`${LABEL_MAPPING[type]}${KEY_MAPPINGS?.[graphKey]}${taxType}`,
								]}
								groupMode="grouped"
								legendX=""
								legendY=""
								width="100%"
								height="300px"
								colors={getColors}
								colorBy="id"
								indexBy="serviceName"
								enableGridY
								legends={false}
								enableLabel={false}
								onClick={onBarClick}
								margin={{ top: 50, right: 30, bottom: 50, left: 60 }}
								tooltip={(props) => {
									const {
										formattedValue,
										color,
										label,
									} = props || {};

									let displayLabel;
									if (label?.includes('financial') || label?.includes('actual')) {
										displayLabel = 'Actual';
									} else if (label?.includes('operational')) {
										displayLabel = 'Operational';
									} else if (label?.includes('estimated')) {
										displayLabel = 'Estimated';
									}

									return (
										<div className={styles.custom_tooltip}>
											<div
												className={styles.color_indicator}
												style={{ background: color }}
											/>
											<div>
												{displayLabel}
												:
											</div>
											<div className={styles.value}>{formattedValue}</div>
										</div>
									);
								}}
								axisLeft={{
									tickValues     : 10,
									tickSize       : 0,
									tickPadding    : 4,
									tickRotation   : 0,
									legend         : verticalLabel,
									legendPosition : 'middle',
									legendOffset   : -50,
									ariaHidden     : true,
									format         : (verticalLabel?.includes('Percentage'))
										? formatPercentageLabel : defaultAmountFormat,
								}}
								axisBottomRotation={(isLastView
									&& (formattedServiceLevelData?.length > STRAIGHT_AXIS_LIMIT))
									? BOTTOM_AXIS_ROTATION : DEFAULT_ROTATION}
								valueFormat={(value) => formatAmount({
									amount  : String(value),
									options : {
										style                 : 'decimal',
										maximumFractionDigits : 2,
									},
								})}
								isBarClickable={!isLastView}
							/>
						) : (
							<div className={styles.empty_section}>
								No Data Found
							</div>
						)}
					</div>
				) : (
					<div>
						<Placeholder height={300} width="100%" />
					</div>
				)}
			</div>
		</div>
	);
}
export default SingleGraphCard;
