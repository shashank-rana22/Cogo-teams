import { ResponsivePie } from '@cogoport/charts/pie';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Image } from '@cogoport/next';

import burntChartData from '../../../../configuration/burnt-chart-data';
import liabilityChartData from '../../../../configuration/liability-chart-data';
import { ACTIVE_CARD_MAPPING } from '../../../../constants';
import { formatValue } from '../../../../utils/formatValue';

import styles from './styles.module.css';

function PieChart({
	creditData = {},
	debitData = {},
	activeStatsCard = '',
}) {
	const liabilityData = liabilityChartData(creditData);

	const burntData = burntChartData(debitData);
	const activeCard = ACTIVE_CARD_MAPPING({ liabilityData, burntData });

	const checkActiveData = activeCard[activeStatsCard];

	const emptyValue = (checkActiveData || []).every((item) => !item.value);

	if (emptyValue) {
		return (
			<div className={styles.empty_state}>
				<Image
					src={GLOBAL_CONSTANTS.image_url.empty_image}
					alt="empty-state"
					width={150}
					height={150}
				/>
			</div>

		);
	}

	return (
		<ResponsivePie
			data={checkActiveData}
			width={410}
			margin={{ top: 0, right: 180, bottom: 15, left: 15 }}
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
