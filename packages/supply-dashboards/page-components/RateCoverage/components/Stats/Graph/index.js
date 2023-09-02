/* eslint-disable indent */
/* eslint-disable no-mixed-spaces-and-tabs */
import { ResponsiveBar } from '@cogoport/charts/bar';

const DATA = [
	{
		label         : 'India(Import)',
		ExpectedRates : 58,

		ActualRates: 93,

	},
	{
		label: 'India(Export)',

	  ExpectedRates : 136,
	  ActualRates   : 82,

	},
	{
		label: 'Vietnam(Import)',

	  ExpectedRates : 44,
	  ActualRates   : 139,

	},
	{
		label: 'Vietnam(Export)',

	  ExpectedRates : 9,
	  ActualRates   : 160,

	},

];
function Graph() {
	return (
		<ResponsiveBar
			data={DATA}
			keys={['ExpectedRates', 'ActualRates']}
			groupMode="grouped"
			layout="vertical"
			indexBy="label"
			margin={{ top: 30, right: 30, bottom: 50, left: 100 }}
			padding={0.5}
			valueScale={{
				type: 'linear', base: 5,
			}}
			theme={
				{

					grid: {
						line: {
							stroke      : '#EFEFEF',
							strokeWidth : 1,
						},
					},
					axis: {
						domain: {
							line: {
								stroke      : '#e0e0e0',
								strokeWidth : 1,
							},
						},
						legend: {
							text: {
								font         : 'poppins',
								fontSize     : 12,
								fill         : '#bdbdbd',
								outlineWidth : 0,
								outlineColor : 'transparent',
							},
						},

						ticks: {
							line: {
								stroke      : '#BDBDBD',
								strokeWidth : 1,
							},
							text: {
								font         : 'poppins',
								fontSize     : 12,
								fill         : '#BDBDBD',
								outlineWidth : 0,
								outlineColor : 'transparent',
							},
						},
					},
			}
			}
			borderRadius={4}
			colors={['#88CAD1', '#CFEAED']}
			axisLeft={{
				tickSize       : 10,
				tickPadding    : 5,
				tickRotation   : 0,
				legend         : 'Rate Count',
				legendPosition : 'middle',
				legendOffset   : -80,
				tickValues     : 5,
			}}
			enableGridX={false}
			enableLabel={false}

		/>

	);
}

export default Graph;
