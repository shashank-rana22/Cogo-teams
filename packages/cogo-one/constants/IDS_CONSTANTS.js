import getGeoConstants from '@cogoport/globalization/constants/geo';

const geo = getGeoConstants();

export const VIEW_MAPPING = {
	admin_view    : geo.uuid.cogo_one_admin_ids,
	shipment_view : geo.uuid.cogo_one_shipment_agent_ids,
};
