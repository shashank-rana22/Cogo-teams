import { ResponsiveLine } from '@cogoport/charts/line';
import { IcMUp } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

const getColor = ({ current_position, previous_position }) => {
	if (!current_position || !previous_position) return '#13c0d4';

	const trend = current_position - previous_position;

	if (trend === 0) {
		return '#13c0d4';
	}

	return (trend < 0 ? '#34C759' : '#ED3726');
};

const leaderboardColumns = [
	{
		Header   : 'Position',
		accessor : ({ current_position, previous_position }) => {
			const trend = (!current_position || !previous_position) ? 0 : current_position - previous_position;

			const val = Math.abs(trend);

			return (
				<div style={{ display: 'flex' }}>
					{ current_position || '-'}

					<div style={{ marginLeft: '12px', display: 'flex', alignItems: 'center' }}>
						{val ? (
							<IcMUp
								height={12}
								width={12}
								style={{
									marginRight : '4px',
									color       : (trend < 0
										? '#34C759' : '#ED3726'),
									transform: (trend < 0
										? 'rotate(0deg)' : 'rotate(-180deg)'),
								}}
							/>
						) : ''}

						{(val !== 0) ? val : ''}
					</div>
				</div>
			);
		},
	},
	{
		Header   : 'Score Trend',
		accessor : (item) => (
			<div style={{ width: '120px', height: '40px', display: 'flex', padding: '8px 0' }}>
				<ResponsiveLine
					data={[item] || []}
					width={100}
					height={20}
					colors={getColor(item)}
					xScale={{ type: 'point' }}
					yScale={{
						type    : 'linear',
						min     : 'auto',
						max     : 'auto',
						stacked : true,
						reverse : false,
					}}
					axisTop={null}
					axisRight={null}
					axisBottom={null}
					axisLeft={null}
					enableGridX={false}
					enableGridY={false}
					lineWidth={1}
					enablePoints={false}
					pointSize={2}
					pointColor={{ theme: 'background' }}
					pointBorderColor={{ from: 'serieColor' }}
					pointLabelYOffset={-12}
					areaOpacity={0}
					isInteractive={false}
					enableCrosshair={false}
					legends={[]}
					animate={false}
				/>
			</div>
		)
		,
	},
	{
		Header   : 'WARMTH',
		accessor : ({ warmth }) => (
			<div>
				{startCase(warmth) || ''}
			</div>
		),
	},
	{
		Header   : 'ACCOUNT',
		accessor : ({ business_name }) => (
			<div>
				{business_name || '-'}
			</div>
		),
	},
	{
		Header   : 'ALLOCATED KAM',
		accessor : ({ stakeholder_name }) => (
			<div>
				{stakeholder_name || '-'}
			</div>
		),
	},

];

export default leaderboardColumns;
