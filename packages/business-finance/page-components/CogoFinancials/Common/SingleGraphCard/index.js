import { Button, Placeholder } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import { LABEL_MAPPING } from '../../constants';
import RenderCardHeader from '../RenderCardHeader';
import MyResponsiveBar from '../ResponsiveBar';

import styles from './styles.module.css';

const KEY_MAPPINGS = {
	'Operational Profitability' : 'Profitability',
	Revenue                     : 'Revenue',
	Expense                     : 'Cost',
};

const DEFAULT_LENGTH = 1;
const STD_WIDTH = 80;

function SingleGraphCard({
	heading = '',
	setActiveBar = () => {},
	isViewDetailsVisible = false,
	onViewDetails = () => { },
	taxType = '',
	type = '',
	serviceLevelData = [],
	serviceLevelLoading = false,
	defaultWidth = '400',
}) {
	const isLastView = isViewDetailsVisible; // last view of graph cards

	const graphCurrency = serviceLevelData?.[GLOBAL_CONSTANTS.zeroth_index]?.currency || '';
	const verticalLabel = (heading === 'Operational Profitability') ? 'Percentage'
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
				<RenderCardHeader title={heading} />
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
					minWidth: `${(serviceLevelData?.length || DEFAULT_LENGTH) * STD_WIDTH > defaultWidth
						? (serviceLevelData?.length || DEFAULT_LENGTH) * STD_WIDTH : defaultWidth}px`,

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
								axisLeft={{
									tickSize       : 0,
									tickPadding    : 0,
									tickRotation   : 0,
									legend         : verticalLabel,
									legendPosition : 'middle',
									legendOffset   : -40,
									ariaHidden     : true,
									format         : (value) => formatAmount({
										amount  : String(value),
										options : {
											style    : 'decimal',
											notation : 'compact',
										},
									}),
								}}
								axisBottomRotation={0}
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
						<Placeholder height={380} width="100%" />
					</div>
				)}
			</div>

		</div>
	);
}
export default SingleGraphCard;
