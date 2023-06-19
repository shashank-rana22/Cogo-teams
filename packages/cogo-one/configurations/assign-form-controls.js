import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

const EMPTY_STRING_LENGTH = 0;

const entityOptions = Object.values(GLOBAL_CONSTANTS.cogoport_entities || {}).map(
	(eachEntity) => {
		const { id = '', icon:Icon, name = '' } = eachEntity;
		return {
			label: (
				<span>
					{name}
					<Icon style={{ margin: '5px 0 0 10px' }} />
				</span>
			),
			value: id,
		};
	},
);

const controls = {

	assign_user: {
		name        : 'assign_user',
		type        : 'select',
		placeholder : 'Enter name to assign',
		rules       : { required: 'This is required' },
	},
	assign_condition: {
		name        : 'assign_condition',
		type        : 'select',
		placeholder : 'Select Condition',
		options     : [
			{
				label : 'Shipment ID',
				value : 'shipment',
			},
			{
				label : 'Invoice',
				value : 'invoice',
			},
		],
		rules: { required: 'This is required' },
	},
	condition_value: {
		name  : 'condition_value',
		type  : 'input',
		rules : {
			required : true,
			validate : (val) => (val?.trim()?.length <= EMPTY_STRING_LENGTH ? 'This cannot be Empty' : true),
		},
	},
	allow_user: {
		name    : 'allow_user',
		type    : 'radio group',
		options : [
			{
				label : 'Observe',
				value : 'observe',
			},
			{
				label : 'Observe and chat',
				value : 'observe_and_chat',
			},

		],

	},
	assign_entity: {
		name        : 'assign_entity',
		type        : 'select',
		placeholder : 'select Entity',
		options     : entityOptions,
		rules       : { required: 'This is required' },
	},
	assign_role: {
		name        : 'assign_role',
		type        : 'select',
		placeholder : 'select Role',
		options     : [
			{
				label : 'Supply Agent',
				value : 'supply',
			},
			{
				label : 'Support Agent',
				value : 'support',
			},
		],
		rules: { required: 'This is required' },
	},
	assign_service_type: {
		name        : 'assign_service_type',
		type        : 'select',
		placeholder : 'select Service',
		options     : [
			{ value: 'fcl_freight', label: 'FCL' },
			{ value: 'lcl_freight', label: 'LCL' },
			{ value: 'air_freight', label: 'AIR' },
			{ value: 'trailer_freight', label: 'Container Transportation' },
			{ value: 'ftl_freight', label: 'FTL' },
			{ value: 'ltl_freight', label: 'LTL' },
			{ value: 'haulage_freight', label: 'Rail Haulage' },
			{ value: 'fcl_customs', label: 'FCL Customs' },
			{ value: 'lcl_customs', label: 'LCL Customs' },
			{ value: 'air_customs', label: 'AIR Customs' },
			{ value: 'fcl_freight_local', label: 'FCL Freight Local' },
			{ value: 'rail_domestic_freight', label: 'Rail Domestic Freight' },
			{ value: 'fcl_freight_local_agent', label: 'Fcl Freight Local Agent' },
			{ value: 'air_freight_local', label: 'Air Freight Local' },
			{ value: 'fcl_cfs', label: 'FCL CFS' },
		],
	},
};

export const ASSIGN_TYPE_OPTIONS = [
	{
		label       : 'Assign User',
		value       : 'assign_user',
		agent_types : ['sales', 'supply'],
	},
	{
		label       : 'Transfer to Team',
		value       : 'assign_on_entity',
		agent_types : ['sales', 'supply'],
	},
];

export default controls;
