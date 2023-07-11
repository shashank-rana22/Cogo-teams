const controls = [
	{
		name  : 'cargo_weight_per_container',
		label : 'Container Weight (Mt)',
		size  : 'md',
		type  : 'number',
		rules : {
			min      : 0.000001,
			required : 'Weight is required',
		},
		suffix: 'Mt',
	},
];

export default function getControls({ service }) {
	const { id, service_type, cargo_weight_per_container, container_size, containers_count } = service || {};

	const defaultValues = {
		service_id                 : id,
		service_type,
		cargo_weight_per_container : Number(cargo_weight_per_container),
		container_size             : Number(container_size),
		containers_count           : Number(containers_count),

	};

	return { controls, defaultValues };
}
