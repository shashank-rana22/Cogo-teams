import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsListAgents } from '@cogoport/forms/utils/getAsyncFields';

const useGetControls = (isomniChannelAdmin) => {
	const listAgentsOptions = useGetAsyncOptions(
		asyncFieldsListAgents(),
	);

	const controls = [
		{
			label     : '',
			name      : 'status',
			type      : 'radio',
			className : 'status_field_controller',
			value     : '',
			options   : [
				{
					label : 'Unread',
					value : 'unread',
				},
				{
					label : 'All',
					value : 'all',
				},
			],
		},
		{
			label     : 'Channels',
			name      : 'channels',
			type      : 'checkboxgroup',
			className : 'channels_field_controller',
			multiple  : true,
			value     : [],
			options   : [
				{ label: 'Whatsapp', value: 'whatsapp' },
				{ label: 'Platform Chat', value: 'platform_chat' },
			],
		},
		{
			label     : 'Escalation',
			name      : 'escalation',
			type      : 'radio',
			value     : '',
			className : 'escalation_field_controller',
			options   : [
				{
					label : 'Warning',
					value : 'warning',
				},
				{
					label : 'Escalated',
					value : 'escalated',
				},

			],
		},
		{
			label        : 'Assigned To',
			name         : 'assigned_to',
			type         : 'radio',
			value        : '',
			className    : 'escalation_field_controller',
			onlyForAdmin : true,
			options      : [
				{
					label : 'Me',
					value : 'me',
				},
				{
					label : 'Agent',
					value : 'agent',
				},

			],
		},
		{
			label        : '',
			name         : 'assigned_agent',
			type         : 'select',
			value        : '',
			onlyForAdmin : true,
			className    : 'escalation_field_controller',
			placeholder  : 'Select Agent',
			rules        : {
				required: 'This is Requied',
			},
			...(listAgentsOptions || {}),
		},
		!isomniChannelAdmin
		&& {
			label        : 'Assigned To',
			name         : 'assigned_to_me',
			type         : 'radio',
			value        : '',
			onlyForAdmin : false,
			className    : 'escalation_field_controller',
			options      : [
				{
					label : 'Me',
					value : 'me',
				},
			],
		},
	];
	return controls;
};

export default useGetControls;
