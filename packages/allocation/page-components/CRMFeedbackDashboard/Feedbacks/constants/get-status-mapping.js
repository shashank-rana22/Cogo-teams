export const STATUS_MAPPING = {
	active: {
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
};
