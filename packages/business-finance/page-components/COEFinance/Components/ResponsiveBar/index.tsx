import { ResponsiveBar } from '@cogoport/charts/bar/index';
import React from 'react';

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
function MyResponsiveBar({ data }) {
	return (
		<>
			<div>lkfnkl</div>
			<ResponsiveBar
				data={data}
				keys={['Approved', 'Rejected']}
				indexBy="day"
				margin={{ top: 40, right: 30, bottom: 50, left: 60 }}
				padding={0.62}
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
				fill={[
					{
						match: {
							id: 'fries',
						},
						id: 'dots',
					},
					{
						match: {
							id: 'sandwich',
						},
						id: 'lines',
					},
				]}
				legends={[
					{
						dataFrom      : 'keys',
						anchor        : 'bottom-right',
						direction     : 'row',
						justify       : false,
						translateX    : 20,
						translateY    : -280,
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
