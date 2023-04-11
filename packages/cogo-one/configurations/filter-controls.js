import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsListAgents } from '@cogoport/forms/utils/getAsyncFields';

const useGetControls = ({ isomniChannelAdmin = false, tagOptions = [], showBotMessages = false }) => {
	const listAgentsOptions = useGetAsyncOptions(
		asyncFieldsListAgents(),
	);
	const HIDE_CONTROLS_MAPPING = {
		ADMIN : showBotMessages ? ['observer', 'chat_tags'] : ['observer'],
		KAM   : ['assigned_to', 'assigned_agent'],
	};
	const extraStatusOptions = (showBotMessages && isomniChannelAdmin) ? 	[{
		label : 'Seen By User',
		value : 'seen_by_user',
	}] : [];
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
				...extraStatusOptions,
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
			label     : 'Assigned To',
			name      : 'assigned_to',
			type      : 'radio',
			value     : '',
			className : 'escalation_field_controller',
			options   : [
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
			label       : '',
			name        : 'assigned_agent',
			type        : 'select',
			value       : '',
			className   : 'escalation_field_controller',
			placeholder : 'Select Agent',
			rules       : {
				required: 'This is Requied',
			},
			...(listAgentsOptions || {}),
		},
		{
			label     : 'Other Filters',
			name      : 'observer',
			type      : 'radio',
			value     : '',
			multiple  : false,
			className : 'escalation_field_controller',
			options   : [
				{
					label : 'Observer',
					value : 'adminSession',
				},
				{
					label : 'Closed',
					value : 'botSession',
				},
				{
					label : 'Chat Tags',
					value : 'chat_tags',
				},
			],

		},
		{
			label       : isomniChannelAdmin ? 'Tags' : '',
			name        : 'chat_tags',
			type        : 'select',
			value       : '',
			className   : 'escalation_field_controller',
			placeholder : 'Select Tags',
			isClearable : true,
			rules       : {
				required: !isomniChannelAdmin ? 'This is Requied' : false,
			},
			options: tagOptions,
		},
		{
			label     : 'Shipments',
			name      : 'shipment_filters',
			type      : 'checkboxgroup',
			className : 'channels_field_controller',
			multiple  : false,
			options   : [
				{ label: 'Is likely To Book Shipment', value: 'likely_to_book_Shipment' },
			],
		},
	];

	const newControls = controls.filter((item) => !(HIDE_CONTROLS_MAPPING[isomniChannelAdmin ? 'ADMIN' : 'KAM'])
		.includes(item?.name));
	return newControls;
};

export default useGetControls;
