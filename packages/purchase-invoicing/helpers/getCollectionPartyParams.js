import getGeoConstants from '@cogoport/globalization/constants/geo';
import getTradeTypeByIncoTerm from '@cogoport/globalization/utils/getTradeTypeByIncoTerm';

const geo = getGeoConstants();

const getCollectionPartyParams = ({ profile_data, servicesData = [] }) => {
	const primary_service = servicesData?.find((i) => i.main_service_id === null);

	const isFcl = primary_service?.service_type === 'fcl_freight_service';
	const isImport = getTradeTypeByIncoTerm(primary_service?.inco_term) === 'import';

	const { partner:{ user_role_ids = [] } = {} } = profile_data || {};

	if (isFcl && isImport) {
		if (user_role_ids.includes(geo.uuid.document_control_manager)) {
			return { required_bl_do_quotations: true };
		}

		if (user_role_ids.some((i) => [...geo.uuid.service_ops2_role_id, geo.uuid.so_2_manager].includes(i))) {
			return { required_document_quotations: true };
		}
	}

	return {};
};

export default getCollectionPartyParams;
