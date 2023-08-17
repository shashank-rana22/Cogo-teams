import GraphItem from './GraphItem';

function PieChartGraphs({ rollingForecastData = {} }) {
	const { persona_forecasts = {}, weekly_forecasts = {}, container_type_forecasts = {} } = rollingForecastData || {};
	const appleObject = { persona_forecasts, weekly_forecasts, container_type_forecasts };

	console.log('appleObject:', appleObject);
	return (
		<div style={{ display: 'flex', gap: '16px', width: '100%' }}>
			{Object.entries(appleObject).map(([key, obj]) => <GraphItem key={key} data={obj} type={key} />)}
		</div>

	);
}
export default PieChartGraphs;
