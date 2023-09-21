const saas = {
	'/[partner_id]/saas/air-schedules': {
		layoutType : 'no_header',
		navigation : 'saas_air_schedules',
		isMainNav  : true,
	},
	'/[partner_id]/saas/air-schedules/[schedule_id]': {
		layoutType : 'no_header',
		navigation : 'saas_air_schedules',
		isMainNav  : true,
	},
	'/[partner_id]/saas/air-tracking': {
		layoutType : 'no_header',
		navigation : 'saas_air_tracking',
		isMainNav  : true,
	},
	'/[partner_id]/saas/air-tracking/archive': {
		layoutType : 'no_header',
		navigation : 'saas_air_tracking',
		isMainNav  : true,
	},
	'/[partner_id]/saas/air-tracking/[tracker_id]': {
		layoutType : 'no_header',
		navigation : 'saas_air_tracking',
		isMainNav  : true,
	},
};
module.exports = saas;
