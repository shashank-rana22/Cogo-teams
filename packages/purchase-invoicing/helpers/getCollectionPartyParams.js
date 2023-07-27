import getGeoConstants from '@cogoport/globalization/constants/geo';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import getTradeTypeByIncoTerm from '@cogoport/globalization/utils/getTradeTypeByIncoTerm';

const getCollectionPartyParams = ({ profile_data = {}, servicesData = [], shipmentData = {} }) => {
	const geo = getGeoConstants();

	const primary_service = servicesData?.find((i) => i.main_service_id === null);

	const isNewShipment = shipmentData?.created_at && new Date(shipmentData?.created_at)
		>= new Date(GLOBAL_CONSTANTS.others.fcl_import_new_process_date);

	const isFcl = primary_service?.service_type === 'fcl_freight_service';

	const isImport = getTradeTypeByIncoTerm(primary_service?.inco_term) === 'import';

	const { partner:{ user_role_ids = [] } = {} } = profile_data || {};

	if (isFcl && isImport && isNewShipment) {
		if (user_role_ids.includes(geo.uuid.document_control_manager)) {
			return { required_bl_do_quotations: true };
		}

		if (user_role_ids.some((i) => geo.uuid.service_ops2_role_id.includes(i))) {
			return { service_ops2_id: profile_data?.user?.id };
		}
	}

	return {};
};

export default getCollectionPartyParams;
