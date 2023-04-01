import { BarDatum, ResponsiveBar } from '@cogoport/charts/bar';
import { Toggle } from '@cogoport/components';
import getFormattedPrice from '@cogoport/forms/utils/get-formatted-price';
import React, { useState } from 'react';

import { getAmountInLakhCrK } from '../../utils/getAmountInLakhCrK';

import styles from './styles.module.css';

interface ItemDataProps {
	ageingBucket: BarDatum[],
	currency: string,
}
interface ItemProps {
	data: ItemDataProps,
}

function BarChart({ data }:ItemProps) {
	const { ageingBucket = [], currency } = data || {};
	const [isLinearView, setIsLinearView] = useState(true);

	return (
		<div className={styles.container}>
			<div className={styles.toggle}>
				<div className={styles.heading_text}>
					Logarithmic View
				</div>
				<Toggle
					name="linear_view"
					size="md"
					showOnOff
					value={isLinearView as unknown as string}
					onChange={() => setIsLinearView(!isLinearView)}
					disabled={false}
				/>
			</div>
			<div className={styles.bar}>
				<ResponsiveBar
					data={ageingBucket}
					indexBy="ageingDuration"
					keys={['ledgerAmount']}
					margin={{ top: 50, right: 30, bottom: 40, left: 8 }}
					padding={0.6}
					enableGridY={false}
					valueScale={{ type: isLinearView ? 'linear' : 'symlog' }}
					indexScale={{ type: 'band', round: true }}
					colors={['#FCEDBF']}
					layout="vertical"
					groupMode="grouped"
					borderRadius={4}
					borderColor={{
						from      : 'color',
						modifiers : [
							[
								'darker',
								1.6,
							],
						],
					}}
					theme={{
						axis: {
							legend: {
								text: {
									fontWeight : 600,
									fontSize   : 14,
								},
							},
						},

					}}
					axisTop={null}
					innerPadding={8}
					axisRight={null}
					minValue={0}
					axisBottom={{
						tickSize       : 0,
						tickPadding    : 10,
						tickRotation   : 0,
						legend         : 'Days',
						legendPosition : 'middle',
						legendOffset   : 32,
					}}
					axisLeft={{
						tickSize       : 0,
						tickPadding    : 8,
						tickRotation   : 0,
						legend         : 'Amount',
						legendPosition : 'middle',
					}}
					labelSkipWidth={12}
					labelSkipHeight={12}
					label=""
					tooltip={({ label, value }) => (
						<strong className={styles.tooltip_style}>
							{label}
							{' '}
							:
							{' '}
							<tspan color="#000">
								{getFormattedPrice(value, currency)}
							</tspan>
						</strong>
					)}
					legends={[
						{
							dataFrom      : 'keys',
							anchor        : 'bottom-right',
							direction     : 'row',
							justify       : false,
							translateX    : 120,
							translateY    : 280,
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
					layers={[
						'grid',
						'axes',
						'bars',
						'markers',
						'legends',
						({ bars }) => (
							<g>
								{bars.map((bar) => (
									<text
										key={bar.data.id}
										x={bar.x + bar.width / 2}
										y={bar.y + bar.height / 2}
										textAnchor="start"
										transform={`rotate(-90,${bar.x + bar.width / 2},${bar.y + bar.height / 2})`}
										style={{
											dominantBaseline : 'central',
											fontWeight       : '600',
											fontSize         : 12,
											fill             : '#333',
										}}
									>
										{getAmountInLakhCrK(bar.data.value)}
									</text>
								))}
							</g>
						),
					]}
				/>
			</div>
		</div>
	);
}

export default BarChart;
