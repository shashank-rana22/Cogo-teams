const demandForecast = {
	'/[partner_id]/demand-forecast': {
		navigation : 'demand_forecast',
		isMainNav  : true,
	},
	'/[partner_id]/demand-forecast/[origin_id]/[destination_id]': {
		navigation : 'demand_forecast',
		isMainNav  : true,
	},
};

export default demandForecast;
