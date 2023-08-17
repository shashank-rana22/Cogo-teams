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

const generateData = (data, type) => Object.keys(data || {}).reduce(
	(acc, curr) => {
		const { graphData, count } = acc;

		return {
			graphData: [
				...graphData,
				{
					id    : curr,
					label : `${startCase(curr)} ${count}`,
					value : data[curr],
					color : COLORS_MAPPING?.[type]?.[curr],
				},
			],
			count: count + data[curr],
		};
	},
	{ graphData: [], count: 0 },
);

function GraphItem({ data = {}, type = '' }) {
	const { graphData, count } = generateData(data, type);

	return <PieChart data={graphData} count={count} type={type} heading={HEADINGS_MAPPING[type]} />;
}

export default GraphItem;
