import { Button, Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import { INFO_CONTENT, LABEL_MAPPING } from '../../constants';
import RenderCardHeader from '../RenderCardHeader';
import MyResponsiveBar from '../ResponsiveBar';

import styles from './styles.module.css';

const BOTTOM_AXIS_ROTATION = 20;
const DEFAULT_ROTATION = 0;
const STRAIGHT_AXIS_LIMIT = 2;

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
	isViewDetailsVisible = false,
	onViewDetails = () => { },
	taxType = '',
	type = '',
	serviceLevelData = [],
	serviceLevelLoading = false,
	defaultWidth = '300',
}) {
	const isLastView = isViewDetailsVisible; // last view of graph cards

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

	return (
		<div className={styles.container}>
			<div className={styles.flexhead}>
				<RenderCardHeader
					title={heading}
					showInfo
					infoContent={INFO_CONTENT.closedShipmentsBar}
				/>
				{isViewDetailsVisible && (
					<Button
						themeType="secondary"
						onClick={onViewDetails}
					>
						View Details

					</Button>
				)}
			</div>

			<div
				style={{
					minWidth: `${defaultWidth}px`,

				}}
				className={styles.graph}
			>
				{!serviceLevelLoading ? (
					<div>
						{!isEmpty(formattedServiceLevelData) ? (
							<MyResponsiveBar
								data={formattedServiceLevelData}
								keys={[
									`estimated${KEY_MAPPINGS?.[heading]}${taxType}`,
									`${LABEL_MAPPING[type]}${KEY_MAPPINGS?.[heading]}${taxType}`,
								]}
								groupMode="grouped"
								legendX=""
								legendY=""
								width="100%"
								height="300px"
								colors={['#cfeaed', '#6fa5ab']}
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
									tickSize       : 0,
									tickPadding    : 0,
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
