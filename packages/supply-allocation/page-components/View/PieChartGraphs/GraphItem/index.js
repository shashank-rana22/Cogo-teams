import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import formatDate from '@cogoport/globalization/utils/formatDate';
import { startCase } from '@cogoport/utils';

import PieChart from '../../../../commons/PieChart';
import {
	CONTAINER_TYPE_DISTRIBUTION_COLORS,
	WEEKY_DISTRIBUTION_COLORS,
	PERSONA_DISTRIBUTION_COLORS,
} from '../../../../configs/pie-chart-colors-mapping';

const COLORS_MAPPING = {
	container_type_forecasts : CONTAINER_TYPE_DISTRIBUTION_COLORS,
	weekly_forecasts         : WEEKY_DISTRIBUTION_COLORS,
	persona_forecasts        : PERSONA_DISTRIBUTION_COLORS,
};

const HEADINGS_MAPPING = {
	container_type_forecasts : 'Container Type Distribution',
	weekly_forecasts         : 'Weekly Distribution',
	persona_forecasts        : 'Persona Distribution',
};

const generateData = (data, type) => {
	const isWeeklyForecast = type === 'weekly_forecasts';
	const isContainerTypeForecast = type === 'container_type_forecasts';

	return Object.entries(data || {}).reduce(
		(accumulator, [key, value], index) => {
			const { graphData, count, legendsData } = accumulator;
			let label;
			let color;

			if (isWeeklyForecast) {
				const dateRange = JSON.parse(key);
				const [startDate, endDate] = dateRange.map((date) => formatDate({
					date       : date.split(' ')[GLOBAL_CONSTANTS.zeroth_index],
					dateFormat : GLOBAL_CONSTANTS.formats.date['dd MMM'],
					formatType : 'date',
				}));

				label = `${startDate} to ${endDate}`;
				color = WEEKY_DISTRIBUTION_COLORS[index];
			} else {
				label = `${startCase(key)}`;
				color = COLORS_MAPPING?.[type]?.[key];
			}

			if (isContainerTypeForecast && key === 'refer') { label = 'Reefer'; }

			return {
				graphData: [
					...graphData,
					{
						id: key,
						label,
						value,
						color,
					},
				],
				legendsData: [
					...legendsData,
					{
						color,
						label,
						currCount: value,
					},
				],
				count: count + value,
			};
		},
		{ graphData: [], count: 0, legendsData: [] },
	);
};

function GraphItem({ data = {}, type = '' }) {
	const { graphData, count, legendsData } = generateData(data, type);

	return (
		<PieChart
			data={graphData}
			count={count}
			type={type}
			heading={HEADINGS_MAPPING[type]}
			legendsData={legendsData}
		/>
	);
}

export default GraphItem;
