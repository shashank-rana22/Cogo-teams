import getGeoConstants from '@cogoport/globalization/constants/geo';

const getViewTypeMapping = () => {
	const geo = getGeoConstants();

	const USER_IDS_CHECK = {
		cogoone_admin: geo.uuid.cogo_one_admin_user_ids,
	};

	const ROLE_IDS_CHECK = {
		shipment_view : geo.uuid.cogo_one_shipment_agent_ids,
		kam_view      : geo.uuid.cogo_one_kam_agent_ids,
		cogoone_admin : geo.uuid.cogo_one_admin_ids,
	};

	return {
		USER_IDS_CHECK, ROLE_IDS_CHECK,
	};
};

export default getViewTypeMapping;
