import useGetAsyncOptions from '@cogoport/forms/hooks/useGetAsyncOptions';
import { asyncFieldsListAgents } from '@cogoport/forms/utils/getAsyncFields';

const useGetControls = ({ isomniChannelAdmin = false, tagOptions = [], showBotMessages = false, viewType = '' }) => {
	const listAgentsOptions = useGetAsyncOptions(
		asyncFieldsListAgents(),
	);
	const HIDE_CONTROLS_MAPPING = {
		admin_view    : ['observer', 'shipment_view_bot_session'],
		kam           : ['assigned_to', 'assigned_agent', 'shipment_view_bot_session'],
		shipment_view : ['assigned_to', 'assigned_agent', 'observer'],
	};
	const extraStatusOptions = (showBotMessages && isomniChannelAdmin) ? 	[{
		label : 'Seen By User',
		value : 'seen_by_user',
	}] : [];

	const controls = [
		{
			label          : '',
			name           : 'status',
			controllerType : 'radio',
			className      : 'status_field_controller',
			value          : '',
			options        : [
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
			label          : '',
			name           : 'shipment_view_bot_session',
			controllerType : 'checkboxgroup',
			className      : 'channels_field_controller',
			options        : [
				{ label: 'Bot Session', value: 'bot_session' },
			],
		},
		{
			label          : 'Channels',
			name           : 'channels',
			controllerType : 'checkboxgroup',
			className      : 'channels_field_controller',
			multiple       : true,
			value          : [],
			options        : [
				{ label: 'Whatsapp', value: 'whatsapp' },
				{ label: 'Platform Chat', value: 'platform_chat' },
				{ label: 'Telegram', value: 'telegram' },
			],
		},
		{
			label          : 'Escalation',
			name           : 'escalation',
			controllerType : 'radio',
			value          : '',
			className      : 'escalation_field_controller',
			options        : [
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
			label          : 'Assigned To',
			name           : 'assigned_to',
			controllerType : 'radio',
			value          : '',
			className      : 'escalation_field_controller',
			options        : [
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
			label          : '',
			name           : 'assigned_agent',
			controllerType : 'select',
			value          : '',
			className      : 'escalation_field_controller',
			placeholder    : 'Select Agent',
			rules          : {
				required: 'This is Requied',
			},
			...(listAgentsOptions || {}),
		},
		{
			label          : 'Other Filters',
			name           : 'observer',
			controllerType : 'radio',
			value          : '',
			multiple       : false,
			className      : 'escalation_field_controller',
			options        : [
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
			label          : isomniChannelAdmin ? 'Tags' : '',
			name           : 'chat_tags',
			controllerType : 'select',
			value          : '',
			className      : 'escalation_field_controller',
			placeholder    : 'Select Tags',
			isClearable    : true,
			rules          : {
				required: !isomniChannelAdmin ? 'This is Required' : false,
			},
			options: tagOptions,
		},
		{
			label          : 'Shipments',
			name           : 'shipment_filters',
			controllerType : 'checkboxgroup',
			className      : 'channels_field_controller',
			options        : [
				{ label: 'Is likely To Book Shipment', value: 'likely_to_book_shipment' },
			],
		},
		{
			label:
		(
			<p>
				Mobile No.
				<br />
				(along with country code)
			</p>),
			name           : 'mobile_no',
			controllerType : 'input',
			placeholder    : 'enter here',
			size           : 'md',
			type           : 'number',
		},
	];

	const newControls = controls.filter((item) => !(HIDE_CONTROLS_MAPPING[viewType || 'kam'])
		.includes(item?.name));
	return newControls;
};

export default useGetControls;
