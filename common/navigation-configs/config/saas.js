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
	'/[partner_id]/saas/tracking': {
		layoutType : 'no_header',
		navigation : 'saas_air_tracking',
		isMainNav  : true,
	},
	'/[partner_id]/saas/tools/tracking/list': {
		layoutType : 'no_header',
		navigation : 'saas_air_tracking',
		isMainNav  : true,
	},
	'/[partner_id]/saas/tools/tracking/list/archive/[trackingType]': {
		layoutType : 'no_header',
		navigation : 'saas_air_tracking',
		isMainNav  : true,
	},
	'/[partner_id]/saas/tools/tracking/list/[trackingType]/[trackingId]': {
		layoutType : 'no_header',
		navigation : 'saas_air_tracking',
		isMainNav  : true,
	},
};
module.exports = saas;
