import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';

export const getAlteredPrimaryService = ({
	primary_service = {},
	shipment_data = {},
}) => {
	const newPrimaryService = { ...primary_service };

	newPrimaryService.trucks_count = shipment_data?.trucks_total_count;
	const { weight, volume, truck_types } = (
		shipment_data?.all_services || []
	).reduce(
		(acc, curr) => {
			acc.weight += curr?.weight || GLOBAL_CONSTANTS.zeroth_index;
			acc.volume += curr?.volume || GLOBAL_CONSTANTS.zeroth_index;
			acc.truck_types.push(curr?.truck_type || '');

			return acc;
		},
		{ weight: 0, volume: 0, truck_types: [] },
	);
	newPrimaryService.weight = weight;
	newPrimaryService.volume = volume;
	newPrimaryService.truck_type = null;
	newPrimaryService.truck_types = [...new Set(truck_types)];
	return newPrimaryService;
};
