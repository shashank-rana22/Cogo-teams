import getGeoConstants from '@cogoport/globalization/constants/geo';

const geo = getGeoConstants();

export const getSecondaryTabOptions = () => ({
	active: {
		key          : 'active',
		title        : 'active',
		hide_columns : geo.navigations.enrichment.manual_enrichment.hide_columns.active,
		actions      : {
			add    : 'Add Details',
			failed : 'Mark as Failed',

		},
	},
	responded: {
		key          : 'responded',
		title        : 'processing',
		hide_columns : geo.navigations.enrichment.manual_enrichment.hide_columns.responded,
		actions      : {
			edit    : 'Edit Details',
			success : 'Mark as Completed',
		},
	},
	success: {
		key          : 'success',
		title        : 'completed',
		hide_columns : geo.navigations.enrichment.manual_enrichment.hide_columns.success,
		actions      : {},
	},

});

export const getActionConfigurations = ({ secondaryTab = '' }) => {
	const SECONDARY_TAB_OPTIONS = getSecondaryTabOptions();

	return SECONDARY_TAB_OPTIONS[secondaryTab]?.actions;
};
