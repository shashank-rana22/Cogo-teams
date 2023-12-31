import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

import AddContactsForm from '../common/AddContactsForm';

const COMMUNICATION_RES_MAPPING = {
	call: [
		{
			label : 'Answered',
			value : 'answered',
		},
		{
			label : 'Wrong Number',
			value : 'wrong_number',
		},
		{
			label : 'Invalid Number',
			value : 'invalid_number',
		},
		{
			label : 'Not Reachable',
			value : 'not_reachable',
		},
		{
			label : 'Busy',
			value : 'busy',
		},
		{
			label : 'Not Answered',
			value : 'unanswered',
		},
	],
	email: [
		{
			label : 'Replied',
			value : 'replied',
		},
		{
			label : 'Not Replied',
			value : 'not_replied',
		},
		{
			label : 'Invalid Email',
			value : 'invalid_email',
		},
		{
			label : 'Not Opened',
			value : 'unopened',
		},
	],
	meeting: [
		{
			label : 'Did not show up',
			value : 'did_not_show_up',
		},
		{
			label : 'Rescheduled',
			value : 'rescheduled',
		},
		{
			label : 'Successful',
			value : 'successful',
		},
	],
	demo: [
		{
			label : 'Did not show up',
			value : 'did_not_show_up',
		},
		{
			label : 'Rescheduled',
			value : 'rescheduled',
		},
		{
			label : 'Successful',
			value : 'successful',
		},
	],
};

const getControls = ({ communicationType = '', lead_organization_id = '', watch = () => {} }) => {
	const {
		communication_start_time = '',
		communication_end_time = '',
		lead_user_id = '',
		additional_lead_user_ids = [],
	} = watch();

	return [
		{
			name        : 'title',
			label       : 'Title',
			controlType : 'input',
			placeholder : 'Enter title',
			width       : '100%',
			type        : 'text',
			rules       : { required: 'This is Required' },
		},
		{
			name        : 'communication_response',
			label       : 'Communication Response',
			controlType : 'select',
			options     : COMMUNICATION_RES_MAPPING[communicationType],
			width       : '100%',
			rules       : { required: 'This is Required' },
		},
		{
			name           : 'communication_start_time',
			label          : 'Start Time',
			controlType    : 'datePicker',
			width          : '50%',
			placeholder    : 'Select Date-Time',
			withTimePicker : true,
			// eslint-disable-next-line max-len
			dateFormat     : `${GLOBAL_CONSTANTS.formats.date['dd MMM yyyy']} ${GLOBAL_CONSTANTS.formats.time['hh:mm aaa']}`,
			maxDate        : communication_end_time,
			rules          : {
				required : 'This is Required',
				validate : (value) => (value > communication_end_time ? 'Cannot be greater than end time' : true),
			},
		},
		{
			name           : 'communication_end_time',
			label          : 'End Time',
			controlType    : 'datePicker',
			withTimePicker : true,
			placeholder    : 'Select Date-Time',
			width          : '50%',
			// eslint-disable-next-line max-len
			dateFormat     : `${GLOBAL_CONSTANTS.formats.date['dd MMM yyyy']} ${GLOBAL_CONSTANTS.formats.time['hh:mm aaa']}`,
			minDate        : communication_start_time,
			rules          : {
				required : 'This is Required',
				validate : (value) => (value < communication_start_time ? 'Cannot be less than start time' : true),
			},
		},
		{
			label       : 'Attendee from Cogoport',
			name        : 'agent_id',
			placeholder : 'Search via name',
			controlType : 'asyncSelect',
			asyncKey    : 'partner_users_ids',
			valueKey    : 'user_id',
			width       : '100%',
			rules       : { required: 'This is Required' },
		},
		{
			label       : 'Primary Attendee from Organization',
			name        : 'lead_user_id',
			placeholder : 'Search via name',
			controlType : 'asyncSelect',
			asyncKey    : 'lead_org_users',
			valueKey    : 'lead_user_id',
			isClearable : true,
			width       : '100%',
			initialCall : false,
			params      : {
				lead_user_data_required : true,
				filters                 : {
					lead_organization_id,
					except_lead_user_ids : additional_lead_user_ids,
					status               : 'active',
				},
			},
			rules: { required: 'This is Required' },
		},
		{
			label       : 'Additional Attendee from Organization',
			name        : 'additional_lead_user_ids',
			placeholder : 'Search via name',
			controlType : 'asyncSelect',
			asyncKey    : 'lead_org_users',
			valueKey    : 'lead_user_id',
			initialCall : false,
			multiple    : true,
			isClearable : true,
			width       : '100%',
			params      : {
				lead_user_data_required : true,
				filters                 : {
					lead_organization_id,
					status               : 'active',
					except_lead_user_ids : [lead_user_id],
				},
			},
		},
		{
			name                : 'added_additional_contacts',
			controlType         : 'fieldArray',
			append_empty_values : { added_additional_lead_user_id: '' },
			width               : '100%',
			buttonText          : '+ Add New Contact',
			customDelete        : true,
			controls            : [
				{
					name            : 'added_additional_lead_user_id',
					controlType     : 'withControl',
					width           : '100%',
					Component       : AddContactsForm,
					componentParams : {
						lead_organization_id,
					},
				},
			],
		},
		{
			name        : 'communication_summary',
			showLabel   : false,
			controlType : 'textarea',
			width       : '100%',
			rows        : 5,
			label       : 'Add Summary',
			placeholder : 'Enter Summary',
		},
	];
};

export default getControls;
