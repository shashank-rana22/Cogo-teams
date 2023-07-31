import { Button } from '@cogoport/components';
import React from 'react';

import RenderCardHeader from '../RenderCardHeader';
import MyResponsiveBar from '../ResponsiveBar';

import styles from './styles.module.css';

const KEY_MAPPINGS = {
	'Operational Profitability' : 'Profitability',
	Revenue                     : 'Revenue',
	Expense                     : 'Cost',
};

const DEFAULT_LENGTH = 1;
const DEFAULT_WIDTH = 80;

function SingleGraphCard({
	heading = '',
	setActiveBar = () => { },
	isViewDetailsVisible = false,
	onViewDetails = () => { },
	taxType = '',
}) {
	const GRAPH_DATA = [
		{
			estimatedRevenuePreTax          : 2001.0000,
			estimatedRevenuePostTax         : 1600.5000,
			estimatedCostPreTax             : 701.5000,
			estimatedCostPostTax            : 561.2000,
			estimatedProfitabilityPreTax    : 1299.5000,
			estimatedProfitabilityPostTax   : 1039.6000,
			operationalCostPreTax           : 800.0000,
			operationalCostPostTax          : 640.0000,
			operationalRevenuePreTax        : 300.0000,
			operationalRevenuePostTax       : 240.0000,
			operationalProfitabilityPreTax  : 240.0000,
			operationalProfitabilityPostTax : 192.0000,
			actualRevenuePreTax             : 1600.0000,
			actualRevenuePostTax            : 1280.0000,
			actualCostPreTax                : 600.0000,
			actualCostPostTax               : 480.0000,
			actualProfitabilityPreTax       : 1000.0000,
			actualProfitabilityPostTax      : 800.0000,
			invoiceCount                    : 10,
			billCount                       : 6,
			jobCount                        : 2,
			serviceName                     : 'AIR',
			estimatedProfitPreTax           : 0,
			estimatedProfitPostTax          : 0,
			currency                        : 'INR',
			profitabilityPercentPreTax      : -441.45800,
			profitabilityPercentPostTax     : -441.45800,
			revenueDeviationPercentPreTax   : -567.00000,
			revenueDeviationPercentPostTax  : -566.87500,
			expenseDeviationPercentPreTax   : 12.31300,
			expenseDeviationPercentPostTax  : 12.31300,
		},
		{
			estimatedRevenuePreTax          : 20010.0000,
			estimatedRevenuePostTax         : 16005.0000,
			estimatedCostPreTax             : 7015.0000,
			estimatedCostPostTax            : 5612.0000,
			estimatedProfitabilityPreTax    : 12995.0000,
			estimatedProfitabilityPostTax   : 10396.0000,
			operationalCostPreTax           : 8000.0000,
			operationalCostPostTax          : 6400.0000,
			operationalRevenuePreTax        : 3000.0000,
			operationalRevenuePostTax       : 2400.0000,
			operationalProfitabilityPreTax  : 2400.0000,
			operationalProfitabilityPostTax : 1920.0000,
			actualRevenuePreTax             : 16000.0000,
			actualRevenuePostTax            : 12800.0000,
			actualCostPreTax                : 6000.0000,
			actualCostPostTax               : 4800.0000,
			actualProfitabilityPreTax       : 10000.0000,
			actualProfitabilityPostTax      : 8000.0000,
			invoiceCount                    : 100,
			billCount                       : 60,
			jobCount                        : 20,
			serviceName                     : 'OCEAN',
			estimatedProfitPreTax           : 0,
			estimatedProfitPostTax          : 0,
			currency                        : 'INR',
			profitabilityPercentPreTax      : -441.45800,
			profitabilityPercentPostTax     : -441.45800,
			revenueDeviationPercentPreTax   : -567.00000,
			revenueDeviationPercentPostTax  : -566.87500,
			expenseDeviationPercentPreTax   : 12.31300,
			expenseDeviationPercentPostTax  : 12.31300,
		},
		{
			estimatedRevenuePreTax          : 1000.5000,
			estimatedRevenuePostTax         : 800.2500,
			estimatedCostPreTax             : 350.7500,
			estimatedCostPostTax            : 280.6000,
			estimatedProfitabilityPreTax    : 649.7500,
			estimatedProfitabilityPostTax   : 519.8000,
			operationalCostPreTax           : 400.0000,
			operationalCostPostTax          : 320.0000,
			operationalRevenuePreTax        : 150.0000,
			operationalRevenuePostTax       : 120.0000,
			operationalProfitabilityPreTax  : 120.0000,
			operationalProfitabilityPostTax : 96.0000,
			actualRevenuePreTax             : 800.0000,
			actualRevenuePostTax            : 640.0000,
			actualCostPreTax                : 300.0000,
			actualCostPostTax               : 240.0000,
			actualProfitabilityPreTax       : 500.0000,
			actualProfitabilityPostTax      : 400.0000,
			invoiceCount                    : 5,
			billCount                       : 3,
			jobCount                        : 1,
			serviceName                     : 'RAIL',
			estimatedProfitPreTax           : 0,
			estimatedProfitPostTax          : 0,
			currency                        : 'INR',
			profitabilityPercentPreTax      : -441.45800,
			profitabilityPercentPostTax     : -441.45800,
			revenueDeviationPercentPreTax   : -567.00000,
			revenueDeviationPercentPostTax  : -566.87500,
			expenseDeviationPercentPreTax   : 12.31300,
			expenseDeviationPercentPostTax  : 12.31300,
		},
		{
			estimatedRevenuePreTax          : 2001.0000,
			estimatedRevenuePostTax         : 1600.5000,
			estimatedCostPreTax             : 701.5000,
			estimatedCostPostTax            : 561.2000,
			estimatedProfitabilityPreTax    : 1299.5000,
			estimatedProfitabilityPostTax   : 1039.6000,
			operationalCostPreTax           : 800.0000,
			operationalCostPostTax          : 640.0000,
			operationalRevenuePreTax        : 300.0000,
			operationalRevenuePostTax       : 240.0000,
			operationalProfitabilityPreTax  : 240.0000,
			operationalProfitabilityPostTax : 192.0000,
			actualRevenuePreTax             : 1600.0000,
			actualRevenuePostTax            : 1280.0000,
			actualCostPreTax                : 600.0000,
			actualCostPostTax               : 480.0000,
			actualProfitabilityPreTax       : 1000.0000,
			actualProfitabilityPostTax      : 800.0000,
			invoiceCount                    : 10,
			billCount                       : 6,
			jobCount                        : 2,
			serviceName                     : 'SURFACE',
			estimatedProfitPreTax           : 0,
			estimatedProfitPostTax          : 0,
			currency                        : 'INR',
			profitabilityPercentPreTax      : -441.45800,
			profitabilityPercentPostTax     : -441.45800,
			revenueDeviationPercentPreTax   : -567.00000,
			revenueDeviationPercentPostTax  : -566.87500,
			expenseDeviationPercentPreTax   : 12.31300,
			expenseDeviationPercentPostTax  : 12.31300,
		},
	];

	const onBarClick = (e) => {
		setActiveBar(e?.indexValue);
	};

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
				style={{ minWidth: `${(GRAPH_DATA?.length || DEFAULT_LENGTH) * DEFAULT_WIDTH}px` }}
				className={styles.graph}
			>
				<MyResponsiveBar
					data={GRAPH_DATA}
					keys={[
						`estimated${KEY_MAPPINGS?.[heading]}${taxType}`,
						`actual${KEY_MAPPINGS?.[heading]}${taxType}`,
					]}
					legendX=""
					legendY=""
					width="100%"
					height="300px"
					colors={['#cfeaed', '#6fa5ab']}
					colorBy="id"
					indexBy="serviceName"
					enableGridY
					legends={false}
					onClick={onBarClick}
					margin={{ top: 50, right: 30, bottom: 50, left: 60 }}
					axisLeft={{
						tickSize       : 0,
						tickPadding    : 0,
						tickRotation   : 0,
						legend         : 'Percentage',
						legendPosition : 'middle',
						legendOffset   : -40,
						ariaHidden     : true,
					}}
				/>
			</div>

		</div>
	);
}
export default SingleGraphCard;
