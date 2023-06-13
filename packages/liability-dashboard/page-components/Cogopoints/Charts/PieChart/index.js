import { ResponsivePie } from '@cogoport/charts/pie';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

import burntChartData from '../../../../configuration/burnt-chart-data';
import liabilityChartData from '../../../../configuration/liability-chart-data';
import { formatValue } from '../../../../utils/formatValue';

function PieChart({
	creditData = {},
	debitData = {},
	activeStatsCard = '',
}) {
	const { liabilityData } = liabilityChartData(creditData);

	const { burntData } = burntChartData(debitData);

	const checkActiveData = activeStatsCard === 'liability_point_value' ? liabilityData : burntData;

	const emptyValue = (checkActiveData || []).every((item) => item.value === 0);

	if (emptyValue) {
		return (
			<Image
				src={GLOBAL_CONSTANTS.image_url.empty_state}
				alt="empty-state"
				width={150}
				height={150}
			/>
		);
	}

	return (
		<ResponsivePie
			data={checkActiveData}
			width={440}
			margin={{ top: 15, right: 180, bottom: 15, left: 10 }}
			sortByValue
			activeInnerRadiusOffset={13}
			valueFormat={(val) => formatValue(val)}
			activeOuterRadiusOffset={14}
			enableArcLinkLabels={false}
			arcLinkLabelsSkipAngle={16}
			arcLinkLabelsTextColor="#333333"
			arcLinkLabelsThickness={2}
			arcLinkLabelsColor={{ from: 'color' }}
			arcLabelsRadiusOffset={0.6}
			arcLabelsSkipAngle={16}
			legends={[
				{
					anchor        : 'right',
					direction     : 'column',
					justify       : false,
					translateX    : 10,
					translateY    : 0,
					itemWidth     : -20,
					itemHeight    : 31,
					itemsSpacing  : 0,
					symbolSize    : 13,
					itemDirection : 'left-to-right',
				},
			]}
		/>

	);
}

export default PieChart;
