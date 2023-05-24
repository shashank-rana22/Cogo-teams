import { ResponsiveBar } from '@cogoport/charts/bar/index';
import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function MyResponsiveBar({ data }) {
	return (
		<>
			<div className={styles.invoice}>
				Daily Invoices Trend
				<Tooltip content="Daily approval and rejection statistics " placement="top">
					<div className={styles.icon}>
						<IcMInfo />
					</div>
				</Tooltip>
			</div>

			<div className={styles.border} />

			<ResponsiveBar
				data={data}
				keys={['Approved', 'Rejected']}
				indexBy="date"
				margin={{ top: 50, right: 30, bottom: 80, left: 60 }}
				padding={0.4}
				enableGridY
				valueScale={{ type: 'linear' }}
				indexScale={{ type: 'band', round: true }}
				colors={['#ACDADF', '#F37166']}
				layout="vertical"
				groupMode="grouped"
				borderColor={{
					from      : 'color',
					modifiers : [
						[
							'darker',
							1.6,
						],
					],
				}}
				axisTop={null}
				innerPadding={8}
				axisRight={null}
				minValue={0}
				axisBottom={{
					tickSize     : 0,
					tickPadding  : 10,
					tickRotation : 0,
				}}
				axisLeft={{
					tickSize     : 0,
					tickPadding  : 8,
					tickRotation : 0,
				}}
				labelSkipWidth={12}
				labelSkipHeight={12}
				labelTextColor={{
					from      : 'color',
					modifiers : [
						[
							'darker',
							1,
						],
					],
				}}
				legends={[
					{
						dataFrom      : 'keys',
						anchor        : 'bottom-right',
						direction     : 'row',
						justify       : false,
						translateX    : 20,
						translateY    : -300,
						itemsSpacing  : 50,
						itemWidth     : 100,
						itemHeight    : 20,
						itemDirection : 'left-to-right',
						itemOpacity   : 0.85,
						symbolShape   : 'circle',
						symbolSize    : 20,
						effects       : [
							{
								on    : 'hover',
								style : {
									itemOpacity: 0.7,
								},
							},
						],
					},
				]}
				role="application"
				animate
			/>

		</>
	);
}
export default MyResponsiveBar;
