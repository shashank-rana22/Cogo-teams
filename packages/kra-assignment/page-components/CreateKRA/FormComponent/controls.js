const controls = [
	{
		group       : 'top_controls',
		subControls : [
			{
				name        : 'kra_name',
				type        : 'text',
				label       : 'Enter an appropriate name for the KRA',
				placeholder : 'Name for the KRA',
				rules       : {
					required: 'name is required',
				},
			},

			{
				name        : 'kra_description',
				type        : 'text',
				label       : 'Enter an appropriate description for the KRA',
				placeholder : 'Description for the KRA',
				rules       : {
					required: 'name is required',
				},
			},

		],
	},

	{
		group       : 'mid_controls',
		subControls : [
			{
				name        : 'role_ids',
				type        : 'multiSelect',
				label       : 'Role',
				placeholder : 'Select Role',
				options     : [{ label: 'role', value: 'role' }, { label: 'Role', value: 'Role' }],
			},
			{
				name        : 'tribe_ids',
				type        : 'asyncSelect',
				asyncKey    : 'list_tribes',
				label       : 'Tribes',
				placeholder : 'Tribes',
				multiple    : true,
				params      : {
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
				params      : {
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
				params      : {
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
				params      : {
					filters: {
						status               : 'active',
						partner_entity_types : ['cogoport'],

					},
					page_limit: 100,
				},
			},

		],
	},

	// {
	// 	group       : 'end_controls',
	// 	subControls : [
	// 		{
	// 			subGroups   : 'target_values',
	// 			subControls : [
	// 				{
	// 					name    : 'is_target_entered_manually',
	// 					type    : 'radioGroup',
	// 					label   : 'Is target entered manually',
	// 					options : [
	// 						{
	// 							value : 'yes',
	// 							label : 'Yes',
	// 						},
	// 						{
	// 							value : 'no',
	// 							label : 'No',
	// 						},
	// 					],
	// 				},

	// 				{
	// 					name    : 'is_target_achieved_manually',
	// 					type    : 'radioGroup',
	// 					label   : 'Is achieved entered manually',
	// 					options : [
	// 						{
	// 							value : 'yes',
	// 							label : 'Yes',
	// 						},
	// 						{
	// 							value : 'no',
	// 							label : 'No',
	// 						},
	// 					],
	// 				},
	// 			],
	// 		}, {
	// 			subGroups   : 'remarks',
	// 			subControls : [
	// 				{
	// 					label : 'Anything else?',
	// 					name  : 'description',
	// 					type  : 'textarea',
	// 					rows  : 4,
	// 				},

	// 				{
	// 					name        : 'target_value',
	// 					type        : 'number',
	// 					label       : 'Enter a Target Value for the KRA',
	// 					placeholder : '0',
	// 					rules       : { required: 'Score is required' },
	// 				},
	// 			],
	// 		},
	// 		{
	// 			subGroups   : 'ratings',
	// 			subControls : [
	// 				{
	// 					name        : 'rating_1',
	// 					type        : 'number',
	// 					label       : 'Rating 1 for: ',
	// 					placeholder : '0',
	// 					rules       : { required: 'Rating 1 is required' },
	// 				},

	// 				{
	// 					name        : 'rating_2',
	// 					type        : 'number',
	// 					label       : 'Rating 2 for: ',
	// 					placeholder : '0',
	// 					rules       : { required: 'Rating 2 is required' },
	// 				},

	// 				{
	// 					name        : 'rating_3',
	// 					type        : 'number',
	// 					label       : 'Rating 3 for: ',
	// 					placeholder : '0',
	// 					rules       : { required: 'Rating 3 is required' },
	// 				},

	// 				{
	// 					name        : 'rating_4',
	// 					type        : 'number',
	// 					label       : 'Rating 4 for: ',
	// 					placeholder : '0',
	// 					rules       : { required: 'Rating 4 is required' },
	// 				},

	// 				{
	// 					name        : 'rating_5',
	// 					type        : 'number',
	// 					label       : 'Rating 5 for: ',
	// 					placeholder : '0',
	// 					rules       : { required: 'Rating 5 is required' },
	// 				},
	// 			],
	// 		},
	// 		{
	// 			subGroups   : 'ratings',
	// 			subControls : [{
	// 				name    : 'is_rating_schema_in_percentage',
	// 				type    : 'radioGroup',
	// 				label   : 'Is rating schema in %',
	// 				options : [
	// 					{
	// 						value : 'yes',
	// 						label : 'Yes',
	// 					},
	// 					{
	// 						value : 'no',
	// 						label : 'No',
	// 					},
	// 				],
	// 			},
	// 			],
	// 		},

	// 	],
	// },

	{
		group       : 'end_controls',
		subControls : [
			{
				name    : 'is_target_entered_manually',
				type    : 'radioGroup',
				label   : 'Is target entered manually',
				options : [
					{
						value : 'yes',
						label : 'Yes',
					},
					{
						value : 'no',
						label : 'No',
					},
				],
			},
			{
				name    : 'is_target_achieved_manually',
				type    : 'radioGroup',
				label   : 'Is achieved entered manually',
				options : [
					{
						value : 'yes',
						label : 'Yes',
					},
					{
						value : 'no',
						label : 'No',
					},
				],
			},
			{
				label : 'Anything else?',
				name  : 'description',
				type  : 'textarea',
				rows  : 4,
			},
			{
				name        : 'target_value',
				type        : 'number',
				label       : 'Enter a Target Value for the KRA',
				placeholder : '0',
				rules       : { required: 'Score is required' },
			},
			{
				name        : 'rating_1',
				type        : 'number',
				label       : 'Rating 1 for: ',
				placeholder : '0',
				rules       : { required: 'Rating 1 is required' },
			},
			{
				name        : 'rating_2',
				type        : 'number',
				label       : 'Rating 2 for: ',
				placeholder : '0',
				rules       : { required: 'Rating 2 is required' },
			},
			{
				name        : 'rating_3',
				type        : 'number',
				label       : 'Rating 3 for: ',
				placeholder : '0',
				rules       : { required: 'Rating 3 is required' },
			},
			{
				name        : 'rating_4',
				type        : 'number',
				label       : 'Rating 4 for: ',
				placeholder : '0',
				rules       : { required: 'Rating 4 is required' },
			},
			{
				name        : 'rating_5',
				type        : 'number',
				label       : 'Rating 5 for: ',
				placeholder : '0',
				rules       : { required: 'Rating 5 is required' },
			},
			{
				name    : 'is_rating_schema_in_percentage',
				type    : 'radioGroup',
				label   : 'Is rating schema in %',
				options : [
					{
						value : 'yes',
						label : 'Yes',
					},
					{
						value : 'no',
						label : 'No',
					},
				],
			},

		],
	},

];

export default controls;
