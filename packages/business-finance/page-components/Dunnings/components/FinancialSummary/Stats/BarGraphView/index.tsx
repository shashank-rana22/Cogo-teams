import { Bar, BarDatum } from '@cogoport/charts/bar';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatAmount from '@cogoport/globalization/utils/formatAmount';
import { isEmpty } from '@cogoport/utils';
import React from 'react';

import styles from '../styles.module.css';

interface Props {
	barData?: BarDatum[];
	currency?: string;
}

function BarGraphView({ barData = [], currency = '' }:Props) {
	const keys = ['Collected Amount', 'Outstanding Amount'];

	return (
		<div>
			{(isEmpty(barData) || !barData)
				? (
					<div className={styles.empty_state}>
						<img
							src={GLOBAL_CONSTANTS.image_url.list_no_result_found}
							alt="No Data"
						/>
					</div>
				) : (
					<Bar
						colors={['#DDEBC0', '#ACDADF']}
						width={window.innerWidth - 180}
						height={400}
						margin={{ top: 60, right: 80, bottom: 60, left: 100 }}
						data={barData}
						indexBy="month"
						keys={keys}
						padding={0.2}
						label=""
						labelTextColor="inherit:darker(1.4)"
						labelSkipWidth={16}
						labelSkipHeight={16}
						layout="vertical"
						groupMode="stacked"
						enableGridY={false}
						enableGridX
						axisLeft={{
							tickSize       : 5,
							tickPadding    : 5,
							tickRotation   : 0,
							legend         : 'Amount',
							legendPosition : 'middle',
							legendOffset   : -80,
							format         : (value) => formatAmount({
								amount  :	value,
								currency,
								options : {
									currencyDisplay : 'code',
									style           : 'currency',
									notation        : 'compact',
									compactDisplay  : 'short',
								},
							}),
						}}
						axisBottom={{
							tickSize       : 5,
							tickPadding    : 10,
							tickRotation   : 0,
							legend         : 'Month',
							legendOffset   : 46,
							legendPosition : 'middle',
						}}
						valueFormat={(value) => formatAmount({
							amount  : String(value),
							currency,
							options : {
								style                 : 'decimal',
								maximumFractionDigits : 2,
							},
						})}
						legends={[
							{
								dataFrom          : null,
								anchor            : 'top-right',
								direction         : 'column',
								justify           : false,
								translateX        : 75,
								translateY        : 0,
								itemsSpacing      : 0,
								itemDirection     : 'left-to-right',
								itemWidth         : 120,
								itemHeight        : 20,
								itemOpacity       : 0.75,
								symbolSize        : 12,
								symbolShape       : 'circle',
								symbolBorderColor : '#00000080',
								effects           : [
									{
										on    : 'hover',
										style : {
											itemBackground : '#00000008',
											itemOpacity    : 1,
										},
									},
								],
							},
						]}
					/>
				)}

		</div>
	);
}

export default BarGraphView;
