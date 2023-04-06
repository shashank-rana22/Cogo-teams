const athena_dashboard = {
	athena: [
		{
			api          : 'shipments_by_hscode',
			access_type  : 'private',
			feature      : 'athena_dashboard',
			service_name : 'athena',
		},
		{
			api          : 'hscodes_by_commodity_name',
			access_type  : 'private',
			feature      : 'athena_dashboard',
			service_name : 'athena',
		},
		{
			api          : 'commodity_trend_report',
			access_type  : 'private',
			feature      : 'athena_dashboard',
			service_name : 'athena',
		},
		{
			api          : 'world_countries',
			access_type  : 'private',
			feature      : 'athena_dashboard',
			service_name : 'athena',
		},
	],
};

export default athena_dashboard;
