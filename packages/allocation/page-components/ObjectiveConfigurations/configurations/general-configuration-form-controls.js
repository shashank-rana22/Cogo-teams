import getEntityOptions from '../helpers/get-entity-options';

const controls = [
	{
		name  : 'type',
		label : (
			<>
				Select Objective Type
				<sup style={{ color: 'red' }}>*</sup>
			</>
		),
		type        : 'select',
		placeholder : 'Objective Type',
		options     : [
			{
				label : 'Company',
				value : 'company',
			},
			{
				label : 'Team',
				value : 'team',
			},
		],
		rules: {
			required: 'Objective Type is required',
		},
	},
	{
		name  : 'name',
		label : (
			<>
				Objective Name
				<sup style={{ color: 'red' }}>*</sup>
			</>
		),
		type        : 'text',
		placeholder : 'Objective Name',
		rules       : {
			required: 'Objective Name is required',
		},
	},
	{
		name  : 'partner',
		label : (
			<>
				Select Cogo Entity
				<sup style={{ color: 'red' }}>*</sup>
			</>
		),
		placeholder : 'Cogo Entity',
		type        : 'select',
		options     : getEntityOptions(),
		isClearable : true,
	},
	{
		name  : 'channel',
		label : (
			<>
				Select Channel
				<sup style={{ color: 'red' }}>*</sup>
			</>
		),
		type        : 'multiSelect',
		placeholder : 'Channel',
		options     : [
			{
				label : 'SME',
				value : 'sme',
			},
			{
				label : 'Enterprise',
				value : 'enterprise',
			},
			{
				label : 'CP',
				value : 'cp',
			},
		],
		isClearable: true,
	},
	{
		name  : 'role',
		label : (
			<>
				Select Cogoport Agent Roles
				<sup style={{ color: 'red' }}>*</sup>
			</>
		),
		placeholder : 'Agent Roles',
		type        : 'asyncSelect',
		multiple    : true,
		asyncKey    : 'partner_roles',
		initialCall : false,
		params      : {
			permissions_data_required : false,
			filters                   : {
				partner_entity_types: ['cogoport'],
			},
		},
		isClearable: true,
	},
];

export default controls;
