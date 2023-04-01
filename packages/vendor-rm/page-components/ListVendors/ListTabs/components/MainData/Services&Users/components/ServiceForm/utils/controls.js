import officeLocations from '../../../../../../../../../utils/office-locations.json';
import categoryOptions from '../../../../../../../../utils/category-options';
import subCategoryOptions from '../../../../../../../../utils/sub-category-options';

const getControls = ({ watchCategory = '', pocOptions }) => [
	{
		name        : 'category',
		label       : 'Select Category',
		type        : 'select',
		placeholder : 'Select a Category',
		options     : categoryOptions,
		style       : { flexBasis: '46%', marginRight: '20px' },
		rules       : { required: 'Category is required' },
	},
	{
		name        : 'sub_category',
		label       : 'Select Sub-category',
		type        : 'select',
		placeholder : 'Select a sub-category',
		options     : subCategoryOptions[watchCategory],
		style       : { flexBasis: '46%', marginRight: '20px' },
		rules       : { required: 'Sub Category is required' },
	},
	{
		name        : 'cogoport_office_id',
		label       : 'Select Cogoport Office',
		type        : 'select',
		placeholder : 'Select Location',
		options     : officeLocations,
		style       : { flexBasis: '46%', marginRight: '20px' },
		rules       : { required: 'Office Location is required' },
	},
	{
		name        : 'poc_id',
		label       : 'Select POC',
		type        : 'select',
		placeholder : 'Select a POC',
		options     : pocOptions,
		style       : { flexBasis: '46%', marginRight: '20px' },
		rules       : { required: 'POC is required' },
	},
];

export default getControls;
