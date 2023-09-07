import companyOptions from './FilterContent/companyOptions';

const controls = [
	{
		name        : 'serial_id',
		placeholder : 'Enter serial ID',

		size  : 'sm',
		label : 'SERIAL ID',
		type  : 'input',

		span: 12,
	},
	{
		size        : 'sm',
		placeholder : 'Enter number',
		name        : 'registration_number',

		label : 'PAN NUMBER',
		type  : 'input',

		span: 12,
	},
	{
		size           : 'sm',
		placeholder    : 'Enter or Select Country',
		name           : 'country_id',
		optionValueKey : 'id',
		label          : 'COUNTRY',
		type           : 'country_select',

		span: 12,
	},
	{
		size        : 'sm',
		placeholder : 'Select company type',
		name        : 'company_type',

		label   : 'COMPANY TYPE',
		type    : 'select',
		options : companyOptions,

		span: 12,
	},
];

export default controls;
