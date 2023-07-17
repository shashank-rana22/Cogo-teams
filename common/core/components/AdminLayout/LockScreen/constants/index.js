import getGeoConstants from '@cogoport/globalization/constants/geo';

const getViewTypeMapping = () => {
	const geo = getGeoConstants();

	const ROLE_IDS_CHECK = {
		kam_view: geo.uuid.cogo_one_kam_agent_ids,
	};

	return {
		ROLE_IDS_CHECK,
	};
};

export default getViewTypeMapping;
