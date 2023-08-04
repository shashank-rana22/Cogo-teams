const OPTIONS = [
	{
		value : 'yes',
		label : 'Yes',
	},
	{
		value : 'no',
		label : 'No',

	},
];

const OPERATION_TYPE_OPTIONS = [
	{ value: 'manual', label: 'MANUAL' },
	{ value: 'jira', label: 'JIRA' },
	{ value: 'sql', label: 'SQL' },
];

const getControls = ({ setShowSelectedValue = () => {}, watchOperationType }) => ([
	{
		group       : 'mid_controls',
		subControls : [
			{
				name        : 'role_ids',
				type        : 'asyncSelect',
				asyncKey    : 'list_employee_roles',
				label       : 'Roles',
				placeholder : 'Roles',
				multiple    : true,
				initialCall : true,
				onChange    : (_, e) => {
					setShowSelectedValue((pv) => ({
						...pv,
						role_ids: e,
					}));
				},
				params: {
					filters: {
						status               : 'active',
						partner_entity_types : ['cogoport'],
					},
					page_limit: 100,
				},
			},

			{
				name        : 'tribe_ids',
				type        : 'asyncSelect',
				asyncKey    : 'list_tribes',
				label       : 'Tribes',
				placeholder : 'Tribes',
				multiple    : true,
				initialCall : true,
				onChange    : (_, e) => {
					setShowSelectedValue((pv) => ({
						...pv,
						tribe_ids: e,
					}));
				},
				params: {
					filters: {
						status               : 'active',
						partner_entity_types : ['cogoport'],
					},
					page_limit: 100,
				},
			},

			{
				name        : 'squad_ids',
				type        : 'asyncSelect',
				asyncKey    : 'list_squads',
				label       : 'Squads',
				placeholder : 'Squads',
				multiple    : true,
				initialCall : true,
				onChange    : (_, e) => {
					setShowSelectedValue((pv) => ({
						...pv,
						squad_ids: e,
					}));
				},
				params: {
					filters: {
						status               : 'active',
						partner_entity_types : ['cogoport'],
					},
					page_limit: 100,
				},
			},

			{
				name        : 'chapter_ids',
				type        : 'asyncSelect',
				asyncKey    : 'list_chapters',
				label       : 'Chapters',
				placeholder : 'Chapters',
				multiple    : true,
				initialCall : true,
				onChange    : (_, e) => {
					setShowSelectedValue((pv) => ({
						...pv,
						chapter_ids: e,
					}));
				},
				params: {
					filters: {
						status               : 'active',
						partner_entity_types : ['cogoport'],
					},
					page_limit: 100,
				},
			},

			{
				name        : 'sub_chapter_ids',
				type        : 'asyncSelect',
				asyncKey    : 'list_sub_chapters',
				label       : 'Sub chapter',
				placeholder : 'Sub chapter',
				multiple    : true,
				initialCall : true,
				onChange    : (_, e) => {
					setShowSelectedValue((pv) => ({
						...pv,
						sub_chapter_ids: e,
					}));
				},
				params: {
					filters: {
						status               : 'active',
						partner_entity_types : ['cogoport'],
					},
					page_limit: 100,
				},
			},

		],
	},
	{
		group       : 'end_controls',
		subControls : [
			{
				name        : 'operation_type',
				placeholder : 'Select operation type',
				type        : 'select',
				label       : 'Operation Type',
				options     : OPERATION_TYPE_OPTIONS,
			},

			{
				label : 'Anything else?',
				name  : 'description',
				type  : 'textarea',
			},

			{
				name        : 'target_value',
				type        : 'number',
				label       : 'Enter a Target Value for the KRA',
				placeholder : '0',
				rules       : { required: 'Score is required' },
			},

			{
				name    : 'is_rating_schema_in_percentage',
				type    : 'radioGroup',
				label   : 'Is rating schema in %',
				options : [{ value: 'yes', label: 'Yes' }, {
					value    : 'no',
					label    : 'No',
					disabled : watchOperationType === 'manual',
				}],
			},

			{
				name    : 'is_rating_individual',
				type    : 'radioGroup',
				label   : 'Can assign Targets Individually',
				options : OPTIONS,
			},
		],
	},
	{
		group       : 'rating',
		subControls : [
			{
				name        : 'rating_1',
				type        : 'number',
				label       : 'Upper cap for rating 1 :',
				placeholder : '0',
				rules       : { required: 'Rating 1 is required' },
			},

			{
				name        : 'rating_2',
				type        : 'number',
				label       : 'Upper cap for rating 2 :',
				placeholder : '0',
				rules       : { required: 'Rating 2 is required' },
			},

			{
				name        : 'rating_3',
				type        : 'number',
				label       : 'Upper cap for rating 3 :',
				placeholder : '0',
				rules       : { required: 'Rating 3 is required' },
			},

			{
				name        : 'rating_4',
				type        : 'number',
				label       : 'Upper cap for rating 4 :',
				placeholder : '0',
				rules       : { required: 'Rating 4 is required' },
			},

			{
				name        : 'rating_5',
				type        : 'number',
				label       : 'Lower cap for rating 5 :',
				placeholder : '0',
				rules       : { required: 'Rating 5 is required' },
			},
		],
	},

]);

export default getControls;
