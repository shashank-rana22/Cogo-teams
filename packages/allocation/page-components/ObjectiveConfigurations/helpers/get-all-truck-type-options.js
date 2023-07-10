import getGeoConstants from '@cogoport/globalization/constants/geo';
import { startCase } from '@cogoport/utils';

const getAllTruckTypeOptions = () => {
	const geo = getGeoConstants();

	return [...geo.options.open_truck, ...geo.options.closed_truck].map(
		(truck_type) => ({ ...truck_type, label: startCase(truck_type.value) }),
	);
};

export default getAllTruckTypeOptions;
