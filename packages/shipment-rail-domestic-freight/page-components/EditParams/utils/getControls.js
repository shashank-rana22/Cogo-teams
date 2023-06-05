const controls = [
	{
		name  : 'packages_count',
		label : 'Packages Count',
		size  : 'sm',
		type  : 'number',
		rules : {
			min      : 1,
			required : 'Packages count is required',
		},
	},
	{
		name  : 'weight',
		label : 'Weight (Kgs)',
		size  : 'sm',
		type  : 'number',
		rules : {
			min      : 0.000001,
			required : 'Weight is required',
		},
	},
	{
		name  : 'volume',
		label : 'Volume',
		size  : 'sm',
		type  : 'number',
		rules : {
			min      : 0.000001,
			required : 'Volume is required',
		},
	},
];

export default function getControls({ service }) {
	const { id, service_type, packages_count, weight, volume } = service || {};

	const defaultValues = {
		service_id     : id,
		service_type,
		packages_count : Number(packages_count),
		weight         : Number(weight),
		volume         : Number(volume),
	};

	return { controls, defaultValues };
}
