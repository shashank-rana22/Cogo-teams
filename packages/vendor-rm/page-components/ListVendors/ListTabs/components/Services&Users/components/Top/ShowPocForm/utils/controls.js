const controls = [
	{
		name        : 'name',
		label       : 'Name',
		type        : 'text',
		style       : { flexBasis: '30%' },
		placeholder : 'Enter Name',
		rules       : { required: 'Contact Name is required' },
	},
	{
		name        : 'email',
		label       : 'Contact Email ID',
		type        : 'text',
		style       : { flexBasis: '30%' },
		placeholder : 'Type here..',
		rules       : {
			required : 'Email of the Contact is required',
			pattern  : {
				value   : /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/,
				message : 'Email is invalid',
			},
		},
	},
	{
		name        : 'mobile_number',
		label       : 'Contact Number',
		type        : 'mobile-number-select',
		style       : { flexBasis: '30%' },
		placeholder : 'Type here',
		rules       : { required: 'Contact Number is required' },
	},
	{
		name        : 'whatsapp_number',
		label       : 'Whatsapp Number',
		type        : 'mobile-number-select',
		style       : { flexBasis: '30%' },
		placeholder : 'Type here',
		rules       : { required: 'Whatsapp Number is required' },
	},
	{
		name        : 'category',
		label       : 'Role in Company',
		type        : 'select',
		placeholder : 'Select Category',
		style       : { flexBasis: '35%' },
		rules       : { required: 'Category is required' },

	},
	{
		name        : 'sub_category',
		label       : 'Role in Company',
		type        : 'select',
		placeholder : 'Select Sub-Category',
		style       : { flexBasis: '35%' },
		rules       : { required: 'Sub Category is required' },

	},
	{
		name        : 'cogoport_office_id',
		label       : 'Select Branch',
		type        : 'select',
		placeholder : 'Select a city',
		style       : { flexBasis: '35%' },
		rules       : { required: 'Branch is required' },

	},

];

export default controls;
