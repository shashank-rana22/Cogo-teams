import getGeoConstants from '@cogoport/globalization/constants/geo';
import { startCase } from '@cogoport/utils';

const geo = getGeoConstants();

const getAllTruckTypeOptions = () => [...geo.options.open_truck, ...geo.options.closed_truck].map(
	(truck_type) => ({ ...truck_type, label: startCase(truck_type.value) }),
);

export default getAllTruckTypeOptions;
