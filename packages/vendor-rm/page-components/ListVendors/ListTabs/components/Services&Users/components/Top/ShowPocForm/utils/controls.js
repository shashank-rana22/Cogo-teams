import categoryOptions from '../../../../../../../../OnBoardVendor/VendorServices/utils/category-options';
import subCategoryOptions from '../../../../../../../../OnBoardVendor/VendorServices/utils/sub-category-options';

console.log('x', categoryOptions);

const controls = [
	{
		name        : 'name',
		label       : 'Name',
		type        : 'text',
		style       : { flexBasis: '25%' },
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
		name        : 'poc_role',
		label       : 'Role in Company',
		type        : 'multiSelect',
		placeholder : 'Select a role type',
		style       : { flexBasis: '35%' },
		rules       : { required: 'Company Type is required' },
		options:
				[
					{
						label : 'Partner/Owner/Director',
						value : 'i_am_owner',
					},
					{
						label : 'Finance Head',
						value : 'i_am_finance_head',
					},
					{
						label : 'Finance Team Member',
						value : 'i_work_in_finance',
					},
					{
						label : 'Marketing/Sales',
						value : 'i_work_in_marketing_and_sales',
					},
					{
						label : 'Procurement',
						value : 'i_work_in_procurement',
					},
					{
						label : 'Operations',
						value : 'i_work_in_operations',
					},
					{
						label : 'Logistics Manager',
						value : 'i_am_logistics_manager',
					},
					{
						label : 'Other',
						value : 'other',
					},
				],
	},
	{
		name            : 'contact_proof_url',
		showLabel       : false,
		label           : 'Upload Vendor Document Proof (Pan/Aadhar Card)',
		style           : { flexBasis: '100%', marginRight: '0px' },
		type            : 'file',
		themeType       : 'secondary',
		drag            : true,
		uploadIcon      : 'ic-upload',
		onlyURLOnChange : true,
		uploadType      : 'aws',
		rules           : { required: 'Tax Document is required' },
	},
	{
		name        : 'category',
		label       : 'Category',
		type        : 'select',
		placeholder : 'Select Category',
		options     : categoryOptions,
		style       : { flexBasis: '35%' },
		rules       : { required: 'Category is required' },

	},
	{
		name        : 'sub_category',
		label       : 'Sub Category',
		type        : 'select',
		placeholder : 'Select Sub-Category',
		options     : subCategoryOptions,
		style       : { flexBasis: '35%' },
		rules       : { required: 'Sub Category is required' },

	},
	{
		name        : 'cogoport_office_id',
		label       : 'Select Branch',
		type        : 'select',
		placeholder : 'Select a city',
		options   		: [
			{ label: 'Delhi', value: 'd1cd0599-7d89-4219-878e-dc0cbf579948' },
			{ label: 'Coimbatore', value: '61fe95e4-b00a-48f2-b0c6-a58174b7f9dd' },
			{ label: 'Bangalore', value: '26d74ffd-3e85-475c-ab59-99834d1b30fa' },
			{ label: 'Chennai', value: 'cf0b03ed-e4dd-4223-868d-28ad2be715c3' },
			{ label: 'Kolkata', value: 'b721cfa0-f082-4c9c-b85b-2b34e0812066' },
			{ label: 'Noida', value: '601d392b-1e56-4d19-b388-eab84d6e783a' },
			{ label: 'Ambala', value: '4818c333-4680-4365-807a-3774102c1141' },
			{ label: 'Gurgaon', value: '9cf87c31-f991-4351-976d-3abd7eff374d' },
			{ label: 'Haldia', value: '80951077-2790-4c59-92de-daf9fc66307f' },
			{ label: 'Ludhiana', value: '5c540315-40f5-4ef2-bad8-5a982d9c3c94' },
			{ label: 'Kochi', value: '51396881-2ee6-4171-b991-3cf6f342ec04' },
			{ label: 'Hyderabad', value: '9a7cdac9-d585-4e2f-8165-56aafe1df8f3' },
			{ label: 'Pune', value: '59baa839-29d8-4f4f-9d9b-1eabe9e6729f' },
			{ label: 'Jaipur', value: '5d1449fe-25d8-45dc-9906-ee1360728587' },
			{ label: 'Raipur', value: '372dea42-f37a-43be-b95f-a8ad2b00fd8e' },
			{ label: 'Ahmedabad', value: '93523420-62c1-41cb-b2d1-8c4eff928c88' },
			{ label: 'Vadodara', value: 'e6d5764c-62a0-4038-a157-7d5261a824d4' },
			{ label: 'Mumbai', value: '48a489eb-76d3-419a-bffc-dac6715056d3' },
			{ label: 'Rudrapur', value: '68d0e107-5879-4b5c-b0ca-de99230aaf38' },
			{ label: 'Bagdogra', value: 'b906d557-c80f-4819-bfc1-f59d3ebad6ac' },
			{ label: 'Ho Chi Minh', value: 'edaccd90-ee23-4238-b1c1-e15aa9532366' },
		],
		style : { flexBasis: '35%' },
		rules : { required: 'Branch is required' },

	},

];

export default controls;
