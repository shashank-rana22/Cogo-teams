const DEFAULT_CONTAINERS_COUNT_VALUE = 0;

const mergeContainerDetails = (containers) => {
	const MERGRED_VALUES = {};

	containers.forEach((container) => {
		const key = `${container?.container_size}_${container?.container_type}_${container?.commodity}`;

		const isCargoWeight = 'cargo_weight_per_container' in container;

		MERGRED_VALUES[key] = {
			...container,

			containers_count:
				(MERGRED_VALUES[key]?.containers_count || DEFAULT_CONTAINERS_COUNT_VALUE)
				+ (container.containers_count || DEFAULT_CONTAINERS_COUNT_VALUE),

			cargo_weight_per_container: isCargoWeight
				? Math.max(
					MERGRED_VALUES[key]?.cargo_weight_per_container
							|| container?.cargo_weight_per_container,

					container.cargo_weight_per_container,
				)
				: undefined,
		};
	});

	return Object.values(MERGRED_VALUES);
};
export default mergeContainerDetails;
