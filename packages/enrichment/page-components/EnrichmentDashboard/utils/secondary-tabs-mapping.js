export const getSecondaryTabOptions = () => ({
	active: {
		key     : 'active',
		title   : 'active',
		actions : {
			add    : 'Add Details',
			failed : 'Mark as Failed',

		},
	},
	responded: {
		key     : 'responded',
		title   : 'Ongoing',
		actions : {
			edit    : 'Edit Details',
			success : 'Mark as Completed',
		},
	},
	success: {
		key     : 'success',
		title   : 'completed',
		actions : {
			view: 'View Details',
		},
	},

});

export const getActionConfigurations = ({ secondaryTab = '' }) => {
	const SECONDARY_TAB_OPTIONS = getSecondaryTabOptions();

	return SECONDARY_TAB_OPTIONS[secondaryTab]?.actions;
};
