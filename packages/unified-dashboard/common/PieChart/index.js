import { ResponsivePie } from '@cogoport/charts/pie';
import { startCase } from '@cogoport/utils';

import colors from '../../utils/colors';
import currencyCoversion from '../../utils/currencyCoversion';

function PieChart({ chartData = [], margin, currency }) {
	const pieChartData = chartData.map((item) => ({
		id    : startCase(item?.shipment_type) || '-',
		label : startCase(item?.shipment_type) || '-',
		value : currencyCoversion(
			currency,
			item?.overall_revenue_in_usd || 0,
		).toFixed(2),
	}));

	return (
		<ResponsivePie
			data={pieChartData}
			margin={margin}
			innerRadius={0.6}
			padAngle={0}
			justify
			cornerRadius={3}
			enableArcLabels={false}
			enableArcLinkLabels={false}
			isInteractive
			colors={colors}
		/>
	);
}

export default PieChart;
