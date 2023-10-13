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
		navigation : 'saas_tracking',
		isMainNav  : true,
	},
	'/[partner_id]/saas/tracking/list': {
		layoutType : 'no_header',
		navigation : 'saas_tracking',
		isMainNav  : true,
	},
	'/[partner_id]/saas/tracking/list/archive/[trackingType]': {
		layoutType : 'no_header',
		navigation : 'saas_tracking',
		isMainNav  : true,
	},
	'/[partner_id]/saas/tracking/list/[trackingType]/[trackingId]': {
		layoutType : 'no_header',
		navigation : 'saas_tracking',
		isMainNav  : true,
	},
	'/[partner_id]/saas/tracking-job': {
		layoutType : 'no_header',
		navigation : 'tracking_job',
		isMainNav  : true,
	},
};
module.exports = saas;
