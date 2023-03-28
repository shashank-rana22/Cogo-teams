// eslint-disable-next-line
import countries from '../../../.data-store/constants/countries.json';
const indiaOption = countries.find((country) => country.country_code === 'IN');

const countryOptions = [{
	label : indiaOption?.name,
	value : indiaOption?.id,
}];

countries.filter((country) => country.country_code !== 'IN').map((country) => {
	const option = { label: country.name, value: country.id };

	countryOptions.push(option);

	return countryOptions;
});

const PARTNER_OPTIONS = [
	{ label: 'CogoPort India', value: 'india' },
	{ label: 'CogoPort Vietnam', value: 'vietnam' },
];

// const IsCpOptions = [
// 	{ label: 'Yes', value: true },
// 	{ label: 'No', value: false },
// ];

const controls = [

	{
		name        : 'country_id',
		label       : 'Country',
		type        : 'select',
		options     : countryOptions,
		placeholder : 'Type Here...',
		isClearable : true,
		rules       : { required: 'Country is Required' },
	},
	{
		name        : 'partner',
		label       : 'Partner',
		type        : 'select',
		placeholder : 'Type Here...',
		options     : PARTNER_OPTIONS,
		isClearable : true,
		rules       : { required: 'Partner is Required' },

	},
	// {
	// 	name        : 'is_cp',
	// 	label       : 'Is Channel Partner',
	// 	type        : 'select',
	// 	options     : IsCpOptions,
	// 	placeholder : 'Type Here...',
	// },

];

export default controls;
