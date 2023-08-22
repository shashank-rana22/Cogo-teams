const schedules = {
	'/[partner_id]/schedules': {
		navigation : 'schedules',
		isMainNav  : true,
	},
	'/[partner_id]/schedules/service-lanes': {
		navigation : 'schedules-service_lanes',
		isMainNav  : true,
	},
	'/[partner_id]/schedules/service-lanes/[id]': {
		navigation : 'schedules-service_lanes',
		isMainNav  : true,
	},
	'/[partner_id]/schedules/vessel-schedules': {
		navigation : 'schedules-vessel_schedules',
		isMainNav  : true,
	},
	'/[partner_id]/schedules/vessel-schedules/[id]': {
		navigation : 'schedules-vessel_schedules',
		isMainNav  : true,
	},
	'/[partner_id]/schedules/sailing-schedules': {
		navigation : 'schedules-sailing_schedules',
		isMainNav  : true,
	},
	'/[partner_id]/schedules/sailing-schedules/[id]': {
		navigation : 'schedules-sailing_schedules',
		isMainNav  : true,
	},
	'/[partner_id]/schedules/ocean-schedule-coverage': {
		navigation : 'schedules-ocean_schedule_coverage',
		isMainNav  : true,
	},
};
module.exports = schedules;
