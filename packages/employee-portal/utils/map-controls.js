// const COUNTRY_OPTIONS = [
// 	{ label: 'India', value: 'India' },
// 	{ label: 'Vietnam', value: 'Vietnam' },
// ];

// const CITY_OPTIONS = [
// 	{ label: 'India', value: 'India' },
// 	{ label: 'Vietnam', value: 'Vietnam' },
// ];

const controls = [
	{
		name        : 'country_name',
		label       : 'Country',
		type        : 'select',
		placeholder : 'Select Country',
		options     : [],
		isClearable : true,
		rules       : { required: 'Country is Required' },
	},
	{
		name        : 'city_name',
		label       : 'City',
		type        : 'select',
		placeholder : 'Select City',
		options     : [],
		isClearable : true,
		rules       : { required: 'City is Required' },
	},
];

export default controls;
