import { startCase } from '@cogoport/utils';

import officeLocations from '../../../../../../../../../utils/office-locations.json';

const getControls = ({ pocOptions }) => [
	{
		name        : 'category',
		label       : 'Select Category',
		type        : 'asyncSelect',
		placeholder : 'Select a Category',
		asyncKey    : 'list_expense_category',
		renderLabel : (item) => startCase(item.categoryName),
		valueKey    : 'categoryName',
		style       : { flexBasis: '46%', marginRight: '20px' },
		rules       : { required: 'Category is required' },
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
