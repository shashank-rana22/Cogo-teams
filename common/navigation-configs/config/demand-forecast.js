const demandForecast = {
	'/[partner_id]/demand-forecast': {
		navigation : 'forecast-demand_forecast',
		isMainNav  : true,
	},
	'/[partner_id]/demand-forecast/[origin_id]/[destination_id]': {
		navigation : 'forecast-demand_forecast',
		isMainNav  : true,
	},
};

export default demandForecast;
