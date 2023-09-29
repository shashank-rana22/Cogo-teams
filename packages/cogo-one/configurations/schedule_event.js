import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const scheduleEvents = ({ orgId = '' }) => ({
	start_date: {
		name        : 'start_date',
		isClearable : true,
		minDate     : new Date(),
		placeholder : 'Start Date',
		dateFormat  : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
	},
	start_time: {
		name       : 'start_time',
		maxDate    : new Date(),
		timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
	},
	end_date: {
		name        : 'end_date',
		minDate     : new Date(),
		placeholder : 'End Date',
		dateFormat  : GLOBAL_CONSTANTS.formats.date['dd MMMM yyyy'],
	},
	end_time: {
		name       : 'end_time',
		maxDate    : new Date(),
		timeFormat : GLOBAL_CONSTANTS.formats.time['hh:mm:ss'],
	},
	organization: {
		label       : 'Select Customer',
		name        : 'organization_id',
		placeholder : 'Select here...',
		controlType : 'asyncSelect',
		isClearable : true,
		valueKey    : 'id',
		rules       : { required: 'customer is required' },
		asyncKey    : 'organizations',
		initialCall : true,
		params      : {
			filters: {
				status: 'active',
			},
		},
	},

	organization_user: {
		name        : 'organization_user_id',
		label       : 'Select POC',
		controlType : 'asyncSelect',
		placeholder : 'Select here...',
		rules       : { required: 'poc is required' },
		asyncKey    : 'list_organization_users',
		isClearable : true,
		params      : {
			filters: {
				organization_id: orgId,
			},
		},
		initialCall: true,
	},
	participate_users: {
		name        : 'participate_users',
		label       : 'Select Participates',
		controlType : 'asyncSelect',
		placeholder : 'Select here...',
		rules       : { required: 'Participates is required' },
		asyncKey    : 'partner_users',
		value       : [],
	},
	remarks: {
		name        : 'remarks',
		label       : 'Remarks',
		controlType : 'textarea',
		placeholder : 'Enter Remarks...',
		rows        : 2,
		show        : true,
		rules       : { required: 'remarks is required' },
	},
	mark_important_event: {
		label       : 'Mark as very important event',
		name        : 'mark_important_event',
		controlType : 'checkbox',
	},
});

export default scheduleEvents;
