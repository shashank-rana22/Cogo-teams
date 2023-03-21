const allocations = {
	'/[partner_id]/allocation/core-engine': {
		navigation : 'allocations-core_engine',
		isMainNav  : true,
	},
	'/[partner_id]/allocation/core-engine/details/[instance_id]': {
		navigation : 'allocations-core_engine',
		isMainNav  : false,
	},
	'/[partner_id]/allocation/kam-expertise': {
		navigation : 'allocations-kam_expertise',
		isMainNav  : true,
	},
	'/[partner_id]/allocation/kam-expertise/configurations': {
		navigation : 'allocations-kam_expertise',
		isMainNav  : false,
	},
	'/[partner_id]/allocation/kam-expertise/view-badges': {
		navigation : 'allocations-kam_expertise',
		isMainNav  : false,
	},
	'/[partner_id]/allocation/kam-expertise/events': {
		navigation : 'allocations-kam_expertise',
		isMainNav  : false,
	},
	'/[partner_id]/allocation/kam-expertise/configurations/all-configurations': {
		navigation : 'allocations-kam_expertise',
		isMainNav  : false,
	},

};

module.exports = allocations;
