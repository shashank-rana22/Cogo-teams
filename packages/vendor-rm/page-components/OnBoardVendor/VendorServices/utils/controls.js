import officeLocations from '../../../../utils/office-locations.json';
import categoryOptions from '../../../utils/category-options';

const controls = [
	{
		name               : 'services',
		label              : 'Office Details',
		type               : 'fieldArray',
		buttonText         : 'Add',
		noDeleteButtonTill : 1,
		showLabelOnce      : true,
		controls           : [
			{
				name        : 'category',
				label       : 'Select Category',
				type        : 'select',
				placeholder : 'Select a Category',
				options     : categoryOptions,
				style       : { flexBasis: '30%' },
				rules       : { required: 'Category is required' },
			},
			{
				name        : 'sub_category',
				label       : 'Select Sub-category',
				type        : 'select',
				placeholder : 'Select a sub-category',
				style       : { flexBasis: '30%' },
				rules       : { required: 'Sub-category is required' },
			},
			{
				name        : 'cogoport_office_id',
				label       : 'Select Cogoport Office',
				type        : 'multiSelect',
				placeholder : 'Select Location',
				style       : { flexBasis: '30%' },
				options     : officeLocations,
				rules       : { required: 'Office Location is required' },
			},
		],
	},
];

export default controls;
