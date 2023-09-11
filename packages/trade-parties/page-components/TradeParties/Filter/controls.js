import companyOptions from '../../../config/companyOptions.json';

const controls = [
	{
		name        : 'serial_id',
		placeholder : 'Enter Serial ID',
		size        : 'sm',
		label       : 'Serial ID',
		type        : 'input',
		span        : 12,
	},
	{
		size        : 'sm',
		placeholder : 'Enter Pan Number or Registration Number',
		name        : 'registration_number',
		label       : ' Pan Number / Registration Number',
		type        : 'input',
		span        : 12,
	},
	{
		size           : 'sm',
		placeholder    : 'Select Country',
		name           : 'country_id',
		optionValueKey : 'id',
		label          : 'Country',
		type           : 'country_select',
		span           : 12,
	},
	{
		size        : 'sm',
		placeholder : 'Select Company Type',
		name        : 'company_type',
		label       : 'Company Type',
		type        : 'select',
		options     : companyOptions,
		span        : 12,
	},
];

export default controls;
