import getGeoConstants from '@cogoport/globalization/constants/geo';

const getViewTypeMapping = () => {
	const geo = getGeoConstants();

	return {
		admin_view    : geo.uuid.cogo_one_admin_ids,
		shipment_view : geo.uuid.cogo_one_shipment_agent_ids,
		supply_view   : geo.uuid.cogo_one_supply_agent_ids,
	};
};

export default getViewTypeMapping;
