import { ResponsiveBar } from '@cogoport/charts/bar';
import formatAmount from '@cogoport/globalization/utils/formatAmount';

const marginData = {
	top    : 10,
	right  : 0,
	bottom : 0,
	left   : 60,
};

const tooltTipStyle = {
	fontSize     : '10px',
	background   : '#eee',
	padding      : '5px',
	borderRadius : '4px',
	zIndex       : 10,
	color        : '#000',
};

const getAmount = ({ amount, currency }) => formatAmount({
	amount  : amount || 0,
	currency,
	options : {
		style                 : 'currency',
		currencyDisplay       : 'symbol',
		notation              : 'compact',
		compactDisplay        : 'short',
		minimumFractionDigits : 2,
	},
});

function BarChart({
	layout = 'vertical',
	data = [],
	currancy: currency,
	margins = marginData,
}) {
	const layoutValue = layout === 'vertical';

	const xAxisValue = !layoutValue && 30;
	const yAxisValue = layoutValue && -4;

	const axisPadding = {
		tickSize    : 0,
		tickPadding : layoutValue ? 8 : 10,
		fill        : 'red',
	};

	const theme = {
		fontSize : '10px',
		axis     : {
			ticks: {
				text: {
					fill     : '#828282',
					fontSize : 10,
				},
			},
		},
	};

	function Bar() {
		return (
			<ResponsiveBar
				data={data}
				keys={['value']}
				indexBy="id"
				colors={['#CDDBFF']}
				layout={layout}
				enableGridY={false}
				axisLeft={layout === 'horizontal' && axisPadding}
				axisBottom={layout === 'vertical' && axisPadding}
				axisRight={false}
				padding={0.15}
				tickSize={0}
				tickPadding={20}
				isInteractive
				label={(d) => (
					<tspan x={xAxisValue} y={yAxisValue}>
						{getAmount({ amount: d.value, currency })}
					</tspan>
				)}
				tooltip={({ label, value }) => (
					<strong style={tooltTipStyle}>
						{label?.split('-')[0]}
						{' '}
						:
						{' '}
						<tspan color="#000">{getAmount({ amount: value, currency })}</tspan>
					</strong>
				)}
				margin={margins}
				theme={theme}
			/>
		);
	}
	return <Bar />;
}

export default BarChart;
