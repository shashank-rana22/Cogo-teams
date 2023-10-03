import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { addDays } from '@cogoport/utils';

import SelectableAgentsUserCard from '../common/SelectableAgentsUserCard';

const ADD_DAY = 1;
const NEW_DATE = new Date();
const EVENTS_ROWS = 2;
const MEETINGS_ROWS = 5;

const scheduleEvents = ({ orgId = '', category = '' }) => ({
	start_date: {
		name        : 'start_date',
		isClearable : true,
		minDate     : NEW_DATE,
		placeholder : 'Start Date',
		dateFormat  : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
	},
	start_time: {
		name       : 'start_time',
		timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm aaa'],
	},
	end_date: {
		name        : 'end_date',
		placeholder : 'End Date',
		minDate     : NEW_DATE,
		maxDate     : addDays(NEW_DATE, ADD_DAY),
		dateFormat  : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
	},
	end_time: {
		name       : 'end_time',
		timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm aaa'],
	},
	organization: {
		label       : 'Select Customer',
		name        : 'organization_id',
		placeholder : 'Select here...',
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
		placeholder : 'Select here...',
		rules       : { required: 'poc is required' },
		asyncKey    : 'list_organization_users',
		valueKey    : 'user_id',
		isClearable : true,
		params      : {
			filters: {
				organization_id: orgId,
			},
		},
		initialCall: true,
	},
	participants_users: {
		name        : 'participants_users',
		label       : 'Select Participants',
		placeholder : 'Select here...',
		rules       : { required: 'Participates is required' },
		asyncKey    : 'list_chat_agents',
		multiple    : true,
		renderLabel : (item) => <SelectableAgentsUserCard item={item} />,
	},
	title: {
		name        : 'title',
		label       : 'Add Title',
		placeholder : 'Add Title...',
		rules       : { required: 'Title is required' },
	},
	remarks: {
		name        : 'remarks',
		label       : 'Remarks',
		placeholder : 'Enter Remarks...',
		rows        : category === 'event' ? EVENTS_ROWS : MEETINGS_ROWS,
		show        : true,
		rules       : { required: 'remarks is required' },
	},
	mark_important_event: {
		label       : 'Mark as very important event',
		name        : 'mark_important_event',
		controlType : 'checkbox',
	},
	occurence_event: {
		label       : 'Select Event Occurence',
		name        : 'occurence_event',
		controlType : 'select',
		isClearable : true,
		value       : 'one_time',
		rules       : { required: 'Occurence is required' },
		options     : [
			{ label: 'One Time', value: 'one_time' },
			{ label: 'Daily', value: 'daily' },
			{ label: 'Weekly', value: 'weekly' },
			{ label: 'Monthly', value: 'monthly' },
			{ label: 'Yearly', value: 'yearly' },
			{ label: 'Custom', value: 'custom' },
		],
	},
});

export default scheduleEvents;
