const allocations = {
	'/allocation/configurations': {
		layoutType : 'no_header',
		navigation : 'allocations-allocation_configurations',
		isMainNav  : true,
	},
	'/allocation/relations': {
		layoutType : 'no_header',
		navigation : 'allocations-allocation_relations',
		isMainNav  : true,
	},
	'/allocation/requests': {
		layoutType : 'no_header',
		navigation : 'allocations-allocation_requests',
		isMainNav  : true,
	},
	'/allocation/quotas': {
		layoutType : 'no_header',
		navigation : 'allocations-allocation_quotas',
		isMainNav  : true,
	},
	'/allocation/details/[instance_id]': {
		layoutType : 'no_header',
		navigation : 'allocations-allocation_configurations',
		isMainNav  : true,
	},
};

module.exports = allocations;
