import { isEmpty } from '@cogoport/utils';
import useGetRollingForecastData from '../../../hooks/useGetRollingForecastData';
import GraphItem from './GraphItem';
import DotLoader from '../../../commons/DotLoader';

function PieChartGraphs({
	originLocationId = '',
	destinationLocationId = '',
	listApiLoading = false,
}) {
	const { data: rollingForecastData = {}, graphDataLoading } =
		useGetRollingForecastData({
			origin_location_id: originLocationId,
			destination_location_id: destinationLocationId,
		});

	const {
		persona_forecasts = {},
		weekly_forecasts = {},
		container_type_forecasts = {},
	} = rollingForecastData || {};

	const mapObject = {
		persona_forecasts,
		weekly_forecasts,
		container_type_forecasts,
	};

	if (listApiLoading) {
		return null;
	}

	if (graphDataLoading) {
		return (
			<div
				style={{
					display: 'flex',
					gap: '16px',
					width: '100%',
					height: '450px',
				}}
			>
				{[1, 2, 3].map((key) => (
					<div
						key={key}
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							background: '#fff',
							padding: '10px',
							marginBottom: '10px',
							flexBasis: '33%',
						}}
					>
						<DotLoader />
					</div>
				))}
			</div>
		);
	}

	if (isEmpty(rollingForecastData)) {
		return null;
	}

	return (
		<div style={{ display: 'flex', gap: '16px', width: '100%' }}>
			{Object.entries(mapObject).map(([key, obj]) => (
				<GraphItem key={key} data={obj} type={key} />
			))}
		</div>
	);
}
export default PieChartGraphs;
