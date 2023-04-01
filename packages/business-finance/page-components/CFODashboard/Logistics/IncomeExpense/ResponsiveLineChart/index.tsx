import { ResponsiveLine } from '@cogoport/charts/line/index';

import { getAmountInLakh } from '../../getAmountInLakh';

function ResponsiveLineChart({ lineData }) {
	const lineChartData = [
		{
			id    : 'india',
			color : '#ACDADF',
			data  : [],
		},
	];
	(lineData || []).forEach((item:any) => {
		const pushData = {
			y : Number(item.income - item.expense),
			x : item.month,
			z : item.income !== 0 ? Number((item.income - item.expense) / item.income) * 100 : 0,
		};
		lineChartData[0].data.push(pushData);
	});

	return (
		<ResponsiveLine
			data={lineChartData}
			margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
			xScale={{ type: 'point' }}
			yScale={{
				type    : 'linear',
				min     : 'auto',
				max     : 'auto',
				stacked : true,
				reverse : false,
			}}
			yFormat={(value) => getAmountInLakh(value)}
			tooltip={({ point = {} }:any) => (
				<div
					style={{
						padding      : '9px 12px',
						background   : '#FFFFFF',
						border       : '1px solid #ACDADF',
						borderRadius : '6px',
						fontWeight   : '600',
						fontSize     : '12px',
					}}
				>
					<div style={{ display: 'flex' }}>
						<div>Contribution Margin :</div>
						<div style={{ marginLeft: '10px', display: 'flex' }}>
							<div>{(point.data.y).toFixed(2)}</div>
							<div style={{ color: '#29CC6A' }}>
								(
								{(point.data.z).toFixed(2)}
								)
								%
							</div>
						</div>
					</div>
				</div>
			)}
			enableGridX={false}
			enablePointLabel
			colors="#ACDADF"
			axisBottom={{
				tickSize: 0, tickPadding: 10, tickRotation: 0,
			}}
			axisLeft={{
				tickSize       : 20,
				tickPadding    : -3,
				tickRotation   : 0,
				legendOffset   : 40,
				legendPosition : 'middle',
				format         : (value) => `${getAmountInLakh(value)}`,
			}}
			pointSize={6}
			pointColor={{ theme: 'background' }}
			pointBorderWidth={2}
			pointBorderColor="#6FA5AB"
			useMesh

		/>
	);
}
export default ResponsiveLineChart;
