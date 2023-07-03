import validate from '../../utils/validateNumber';

const lclControls = () => {
	const controls = [
		{
			name        : 'packages_count',
			label       : 'Packages Count',
			type        : 'input',
			placeholder : 'Enter Packages Count',
			span        : 12,
			rules       : {
				required : true,
				validate : (val) => validate(val),
				max      : 1000,
				min      : 1,
			},
		},
		{
			name        : 'weight',
			label       : 'Weight (kgs)',
			type        : 'input',
			placeholder : 'Enter weight',
			span        : 5,
			rules       : {
				required : true,
				validate : (val) => validate(val),
				min      : 0.000000001,
			},
		},
		{
			name        : 'volume',
			label       : 'Volume (cbm)',
			type        : 'input',
			placeholder : 'Enter volume',
			span        : 6,
			rules       : {
				required : true,
				validate : (val) => validate(val),
				min      : 0.001,
			},
		},
		{
			name          : 'commodity',
			label         : 'Commodity',
			type          : 'select',
			placeholder   : 'Search commodity, or HS Code',
			span          : 12,
			commodityType : 'lcl_freight',
			rules         : { required: true },
		},
	];
	return controls;
};
export default lclControls;
