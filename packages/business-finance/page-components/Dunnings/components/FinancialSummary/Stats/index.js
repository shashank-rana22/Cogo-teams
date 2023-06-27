/* eslint-disable max-lines-per-function */
import { Bar } from '@cogoport/charts/bar';
import { ResponsiveLine } from '@cogoport/charts/line';
import { Toggle } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';
import React, { useState } from 'react';

import styles from './styles.module.css';

function Stats() {
	const [isGraphView, setIsGraphView] = useState(true);
	const keys = ['collected', 'totalOutstanding'];
	const myData = [
		{
			month            : 'Jan',
			collected        : 100,
			totalOutstanding : 144,
		},
		{
			month            : 'Feb',
			collected        : 100,
			totalOutstanding : 144,
		},
		{
			month            : 'Mar',
			collected        : 100,
			totalOutstanding : 144,
		},
	];

	const mockLineData = [
		{
			id    : 'japan',
			color : '#4cceac',
			data  : [
				{
					x : 'plane',
					y : 101,
				},
				{
					x : 'helicopter',
					y : 75,
				},
				{
					x : 'boat',
					y : 36,
				},
			],
		},
		{
			id    : 'france',
			color : '#a4a9fc',
			data  : [
				{
					x : 'plane',
					y : 109,
				},
				{
					x : 'helicopter',
					y : 70,
				},
				{
					x : 'boat',
					y : 30,
				},
			],
		},
	];

	return (
		<div>
			<div className={styles.header}>
				<div className={styles.flex_align}>
					<div className={styles.subject}>Statistics</div>
					<div><IcMInfo /></div>
				</div>
				<div>
					<Toggle
						name="view"
						size="md"
						disabled={false}
						onLabel="Linear View"
						offLabel="Graph View"
						onChange={() => setIsGraphView(!isGraphView)}
					/>
				</div>
			</div>
			{isGraphView ? (
			// <div>
				<Bar
					className="barGraph"
					colors={['#DDEBC0', '#ACDADF']}
					width={900}
					height={500}
					margin={{ top: 60, right: 80, bottom: 60, left: 80 }}
					data={myData}
					indexBy="month"
					keys={keys}
					padding={0.2}
					labelTextColor="inherit:darker(1.4)"
					labelSkipWidth={16}
					labelSkipHeight={16}
					layout="vertical"
					groupMode="stack"
					enableGridY={false}
					enableGridX
					axisLeft={{
						tickSize       : 5,
						tickPadding    : 5,
						tickRotation   : 0,
						legend         : 'INR',
						legendPosition : 'middle',
						legendOffset   : -40,
					}}
					legends={[
						{
							anchor            : 'top-right',
							direction         : 'column',
							justify           : false,
							translateX        : 80,
							translateY        : 0,
							itemsSpacing      : 0,
							itemDirection     : 'left-to-right',
							itemWidth         : 100,
							itemHeight        : 20,
							itemOpacity       : 0.75,
							symbolSize        : 12,
							symbolShape       : 'circle',
							symbolBorderColor : 'rgba(0, 0, 0, .5)',
							effects           : [
								{
									on    : 'hover',
									style : {
										itemBackground : 'rgba(0, 0, 0, .03)',
										itemOpacity    : 1,
									},
								},
							],
						},
					]}
				/>
			// </div>
			)
				: (
					<div>
						linear chart here
						<div>
							<ResponsiveLine
								theme={{
									axis: {
      		domain: {
      			line: {
      				stroke: 'red',
      			},
      		},
      		legend: {
      			text: {
      				fill: 'pink',
      			},
      		},
      		ticks: {
      			line: {
      				stroke      : 'blue',
      				strokeWidth : 1,
      			},
      			text: {
      				fill: 'red',
      			},
      		},
      	},
      	legends: {
      		text: {
      			fill: 'orange',
      		},
      	},
      	tooltip: {
      		container: {
      			background : 'yellow',
      			color      : 'red',
      		},
      	},
								}}
								data={mockLineData}
								colors={{ datum: 'color' }}
								margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
								xScale={{ type: 'point' }}
								yScale={{
      	type    : 'linear',
      	min     : 'auto',
      	max     : 'auto',
      	stacked : true,
      	reverse : false,
								}}
								yFormat=" >-.2f"
								axisTop={null}
								axisRight={null}
								axisBottom={{
      	orient         : 'bottom',
      	tickSize       : 5,
      	tickPadding    : 5,
      	tickRotation   : 0,
      	legend         : undefined,
      	legendOffset   : 36,
      	legendPosition : 'middle',
								}}
								axisLeft={{
      	orient         : 'left',
      	tickSize       : 5,
      	tickValues     : 5,
      	tickPadding    : 5,
      	tickRotation   : 0,
      	legend         : undefined,
      	legendOffset   : -40,
      	legendPosition : 'middle',
								}}
								enableGridX={false}
								enableGridY={false}
								pointSize={10}
								pointColor={{ theme: 'background' }}
								pointBorderWidth={2}
								pointBorderColor={{ from: 'serieColor' }}
								pointLabelYOffset={-12}
								useMesh
								legends={[
      	{
      		anchor            : 'bottom-right',
      		direction         : 'column',
      		justify           : false,
      		translateX        : 100,
      		translateY        : 0,
      		itemsSpacing      : 0,
      		itemDirection     : 'left-to-right',
      		itemWidth         : 80,
      		itemHeight        : 20,
      		itemOpacity       : 0.75,
      		symbolSize        : 12,
      		symbolShape       : 'circle',
      		symbolBorderColor : 'rgba(0, 0, 0, .5)',
      		effects           : [
      			{
      				on    : 'hover',
      				style : {
      					itemBackground : 'rgba(0, 0, 0, .03)',
      					itemOpacity    : 1,
      				},
      			},
      		],
      	},
								]}
							/>
						</div>
					</div>
				)}

		</div>
	);
}

export default Stats;
