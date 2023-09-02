import { ResponsiveLine } from '@cogoport/charts/line';
import { useTranslation } from 'next-i18next';

import GRAPH_COLOUR_MAPPING from './graph-colour-mapping';
import getGraphPropsMapping from './graph-props-mapping';

function ScoreTrendChart(props) {
	const { t } = useTranslation(['allocation']);

	const { trend, data, source } = props;

	const graphData = [{ id: 'trend', data }];

	const graphPropsMapping = getGraphPropsMapping({ t });

	const {
		margin, enableGridX, enableGridY, axisBottom, axisLeft, enableArea,
		enablePoints,
	} = graphPropsMapping[source] || {};

	return (
		<ResponsiveLine
			data={graphData}
			colors={GRAPH_COLOUR_MAPPING[trend] || '#13c0d4'}
			margin={margin}
			lineWidth={1}
			xScale={{ type: 'point' }}
			yScale={{
				type    : 'linear',
				min     : 0,
				max     : 'auto',
				stacked : true,
				reverse : false,
			}}
			axisTop={null}
			axisRight={null}
			axisBottom={axisBottom}
			axisLeft={axisLeft}
			enableGridX={enableGridX}
			enableGridY={enableGridY}
			enablePoints={enablePoints}
			enableArea={enableArea}
			isInteractive={false}
			legends={[]}
			animate
		/>
	);
}

export default ScoreTrendChart;
