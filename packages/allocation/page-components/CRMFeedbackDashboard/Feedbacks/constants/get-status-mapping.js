export const getStatusMapping = ({ t = () => {} }) => ({
	active: {
		status      : t('allocation:request_created'),
		color       : 'blue',
		buttonLabel : t('allocation:active_status_button_label'),
	},
	responded: {
		status      : t('allocation:responded_status_label'),
		color       : 'green',
		buttonLabel : t('allocation:responded_status_button_label'),
	},
	inactive: {
		status      : t('allocation:inactive_status_label'),
		color       : 'red',
		buttonLabel : null,
	},
});
