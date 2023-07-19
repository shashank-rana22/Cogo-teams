export	const controls = [
	{
		type     : 'fieldArray',
		name     : 'emails',
		label    : 'Email',
		controls : [
			{
				controlType : 'select',
				name        : 'user_role',
				label       : 'Role',
				rules       : { required: 'Required' },
				placeholder : 'Search Role',
				options     : [
					{ label: 'Industry Expert', value: 'industry_expert' },
					{ label: 'Cogoport Employee', value: 'cogoport_employee' },
					{ label: 'Customer', value: 'customer' },
					{ label: 'Others', value: 'others' },
				],
			},
			{
				controlType : 'input',
				name        : 'user_name',
				label       : 'name',
				placeholder : 'Name',
				rules       : { required: 'Required' },
			},
			{
				label       : 'email',
				controlType : 'input',
				placeholder : 'Email',
				name        : 'user_email',
				rules       : {
					required : 'Email is required',
					pattern  : {
						value   : /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
						message : 'Please Enter correct Email',
					},
				},
			},
		],
	},

];
export const defaultValues = {
	emails: [{
		user_name  : '',
		user_email : '',
		user_role  : '',
	},
	],
};
