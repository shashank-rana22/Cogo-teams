import officeLocations from '../../../../../../../../../utils/office-locations.json';
import workScopes from '../../../../../../../../../utils/work-scopes.json';
import categoryOptions from '../../../../../../../../OnBoardVendor/VendorServices/utils/category-options';
import subCategoryOptions from '../../../../../../../../OnBoardVendor/VendorServices/utils/sub-category-options';

const controls = [
	{
		name        : 'name',
		label       : 'Name',
		type        : 'text',
		style       : { flexBasis: '42%' },
		placeholder : 'Enter Name',
		rules       : { required: 'Contact Name is required' },
	},
	{
		name        : 'email',
		label       : 'Contact Email ID',
		type        : 'text',
		style       : { flexBasis: '42%' },
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
		style       : { flexBasis: '42%' },
		placeholder : 'Type here',
		rules       : { required: 'Contact Number is required' },
	},
	{
		name        : 'whatsapp_number',
		label       : 'Whatsapp Number',
		type        : 'mobile-number-select',
		style       : { flexBasis: '42%' },
		placeholder : 'Type here',
		rules       : { required: 'Whatsapp Number is required' },
	},
	{
		name        : 'poc_role',
		label       : 'Role in Company',
		type        : 'multiSelect',
		placeholder : 'Select a role type',
		style       : { flexBasis: '42%' },
		rules       : { required: 'Company Type is required' },
		options     : workScopes,
	},
	{
		name            : 'contact_proof_url',
		showLabel       : false,
		label           : 'Upload Vendor Document Proof (Pan/Aadhar Card)',
		style           : { flexBasis: '100%' },
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
		style       : { flexBasis: '42%' },
		rules       : { required: 'Category is required' },

	},
	{
		name        : 'sub_category',
		label       : 'Sub Category',
		type        : 'select',
		placeholder : 'Select Sub-Category',
		options     : subCategoryOptions,
		style       : { flexBasis: '42%' },
		rules       : { required: 'Sub Category is required' },

	},
	{
		name        : 'cogoport_office_id',
		label       : 'Select Branch',
		type        : 'select',
		placeholder : 'Select a city',
		options    	: officeLocations,
		style       : { flexBasis: '42%' },
		rules       : { required: 'Branch is required' },
	},

];

export default controls;
