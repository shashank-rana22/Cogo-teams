import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { addDays } from '@cogoport/utils';

import SelectableAgentsUserCard from '../common/SelectableAgentsUserCard';

const scheduleEvents = ({ orgId = '', startDateField = {}, watch = () => {} }) => {
	const { start_date, end_date, end_time, start_time } = watch();

	return ({
		start_date: {
			name        : 'start_date',
			isClearable : true,
			minDate     : new Date(),
			placeholder : 'Start Date',
			dateFormat  : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			rules       : {
				validate: (value) => (value > end_date ? 'Cannot be greater than end date' : true),
			},
		},
		start_time: {
			name       : 'start_time',
			timeFormat : GLOBAL_CONSTANTS.formats.time['HH:mm aaa'],
		},
		end_date: {
			name                  : 'end_date',
			placeholder           : 'End Date',
			minDate               : startDateField,
			maxDate               : addDays(new Date(startDateField), 1),
			dateFormat            : GLOBAL_CONSTANTS.formats.date['dd MMM yyyy'],
			isPreviousDaysAllowed : true,
			rules                 : {
				validate: (value) => (
					(
						(
							value
						&& (value?.getDate() === start_date?.getDate())
						&& end_time < start_time
						)
					)
						? 'Cannot be less than start time'
						: true),
			},
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
			isClearable : true,
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
			placeholder : 'Select Event',
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
};

export default scheduleEvents;
