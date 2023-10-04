export default function getControls({ service }) {
	const ONE = 1;

	const { id, service_type, containers_count, cargo_weight_per_container } = service || {};

	const controls = [
		{
			name  : 'containers_count',
			label : 'Containers Count',
			size  : 'sm',
			type  : 'number',
			rules : {
				required : 'Container count is required',
				min      : 1,
			},
		},
		{
			name  : 'cargo_weight_per_container',
			label : 'Cargo Weight per Container',
			size  : 'sm',
			type  : 'number',
			rules : {
				required : 'Cargo Weight is required',
				min      : 0.1,
			},
		},
	];

	const defaultValues = {
		service_id                 : id,
		service_type,
		containers_count           : Number(containers_count || ONE),
		cargo_weight_per_container : Number(cargo_weight_per_container || ONE),
	};

	return { controls, defaultValues };
}
