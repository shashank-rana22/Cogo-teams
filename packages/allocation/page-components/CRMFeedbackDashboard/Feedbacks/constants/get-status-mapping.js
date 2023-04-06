export const STATUS_MAPPING = {
	requested: {
		status      : 'Request Created',
		color       : 'blue',
		buttonLabel : 'Deactivate Request',
	},
	responded: {
		status      : 'Response Received',
		color       : 'green',
		buttonLabel : 'View Response',
	},
	inactive: {
		status      : 'Deactivated',
		color       : 'red',
		buttonLabel : null,
	},
	active: {
		status      : 'Active',
		color       : 'blue',
		buttonLabel : null,
	},
};
