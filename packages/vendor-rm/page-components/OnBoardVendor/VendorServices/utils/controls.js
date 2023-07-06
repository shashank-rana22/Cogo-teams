import officeLocations from '../../../../utils/office-locations.json';

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
				type        : 'asyncSelect',
				asyncKey    : 'list_expense_category',
				initialCall : true,
				placeholder : 'Select a Category',
				valueKey    : 'categoryName',
				style       : { flexBasis: '30%' },
				rules       : { required: 'Category is required' },
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
