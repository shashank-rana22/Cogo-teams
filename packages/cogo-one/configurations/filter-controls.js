import { VIEW_TYPE_GLOBAL_MAPPING } from '../constants/viewTypeMapping';

const COMMON_CONTROL_KEYS_TAB_WISE_MAPPING = {
	all         : ['status', 'channels', 'escalation', 'mobile_no', 'shipment_filters'],
	groups      : ['status', 'channels', 'escalation', 'mobile_no', 'shipment_filters'],
	message     : ['status', 'channels', 'escalation', 'mobile_no', 'shipment_filters'],
	teams       : ['status', 'channels', 'escalation', 'mobile_no', 'shipment_filters'],
	contacts    : ['status', 'channels', 'escalation', 'mobile_no', 'shipment_filters'],
	observer    : ['status', 'channels', 'escalation', 'mobile_no', 'shipment_filters'],
	kamContacts : ['status', 'channels', 'escalation', 'mobile_no', 'shipment_filters'],
};

const useGetControls = ({ tagOptions = [], viewType = '', activeSubTab }) => {
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
			],
		},
		{
			label          : 'Channels',
			name           : 'channels',
			controllerType : 'checkboxGroup',
			className      : 'channels_field_controller',
			multiple       : true,
			value          : [],
			options        : [
				{ label: 'Whatsapp', value: 'whatsapp' },
				{ label: 'Platform Chat', value: 'platform_chat' },
				{ label: 'Telegram', value: 'telegram' },
				{ label: 'Zalo', value: 'zalo' },
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
			controllerType : 'asyncSelect',
			asyncKey       : 'list_chat_agents',
			initialCall    : true,
			value          : '',
			className      : 'escalation_field_controller',
			placeholder    : 'Select Agent',
			rules          : {
				required: 'This is Requied',
			},
		},
		{
			label          : 'Tags',
			name           : 'chat_tags',
			controllerType : 'select',
			value          : '',
			className      : 'escalation_field_controller',
			placeholder    : 'Select Tags',
			isClearable    : true,
			options        : tagOptions,
		},
		{
			label          : 'Shipments',
			name           : 'shipment_filters',
			controllerType : 'checkboxGroup',
			className      : 'channels_field_controller',
			options        : [
				{
					label : 'Is likely To Book Shipment',
					value : 'likely_to_book_shipment',
				},
			],
		},
		{
			label          : 'Seen By User',
			name           : '15_min_filter',
			controllerType : 'checkboxGroup',
			className      : 'channels_field_controller',
			options        : [
				{
					label : 'Seen By User',
					value : 'seen_by_user',
				},
			],
		},
		{
			label          : 'Closed',
			name           : 'closed_session',
			controllerType : 'checkboxGroup',
			className      : 'channels_field_controller',
			options        : [
				{
					label : 'Closed',
					value : 'closed',
				},
			],
		},
		{
			label: (
				<p>
					Mobile No.
					<br />
					(along with country code)
				</p>
			),
			name           : 'mobile_no',
			controllerType : 'input',
			placeholder    : 'enter here',
			size           : 'md',
			type           : 'number',
		},
	];

	const ACCESIBLE_FILTERS = [
		...(COMMON_CONTROL_KEYS_TAB_WISE_MAPPING[activeSubTab] || []),
		...(VIEW_TYPE_GLOBAL_MAPPING[viewType]?.accesible_filters?.[activeSubTab] || []),
	];

	return controls.filter((item) => ACCESIBLE_FILTERS.includes(item.name)) || [];
};

export default useGetControls;
