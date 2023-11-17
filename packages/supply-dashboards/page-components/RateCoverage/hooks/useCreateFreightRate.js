import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';

import formatAirCustomsRate from '../payload/format-air-customs-rate';
import formatAirLocal from '../payload/format-air-local';
import formatAirRate from '../payload/format-air-rate';
import formatFclCfs from '../payload/format-fcl-cfs-custom-rate';
import formatFclCustomsRate from '../payload/format-fcl-customs-rate';
import formatFclLocal from '../payload/format-fcl-local';
import formatFclRate from '../payload/format-fcl-rate';
import formatFtlRate from '../payload/format-ftl-rate';
import formatHaulageFreightRate from '../payload/format-haulage-freight-rate';
import formatLclCustomsRate from '../payload/format-lcl-customs-rate';
import formatLclRate from '../payload/format-lcl-rate';
import formatLtlRate from '../payload/format-ltl-rate';
import formatTrailerFreight from '../payload/format-trailer-freight';

const API_NAME = {
	fcl_freight : 'create_fcl_freight_rate',
	air_freight : 'create_air_freight_rate',
	fcl_customs : 'create_fcl_customs_rate',
	haulage     : 'create_haulage_freight_rate',
	lcl_freight : 'create_lcl_freight_rate',
	lcl_customs : 'create_lcl_customs_rate',
	air_customs : 'create_air_customs_rate',
	trailer     : 'create_haulage_freight_rate',
	ltl_freight : 'create_ltl_freight_rate',
	ftl_freight : 'create_ftl_freight_rate',
	fcl_cfs     : 'create_fcl_cfs_rate',
	fcl_local   : 'create_fcl_freight_rate_local',
	air_local   : 'create_air_freight_rate_local',
};

const KEYS_TO_SEND = {
	fcl_freight     : 'fcl_freight_rate_request_id',
	air_freight     : 'air_freight_rate_request_id',
	ftl_freight     : 'ftl_freight_rate_request_id',
	lcl_freight     : 'lcl_freight_rate_request_id',
	ltl_freight     : 'ltl_freight_rate_request_id',
	fcl_customs     : 'fcl_customs_rate_request_id',
	lcl_customs     : 'lcl_customs_rate_request_id',
	air_customs     : 'air_customs_rate_request_id',
	haulage_freight : 'haulage_freight_rate_request_id',
	trailer_freight : 'trailer_freight_rate_request_id',
	fcl_local       : 'fcl_freight_rate_local_request_id',
	air_local       : 'air_freight_rate_local_request_id',
};

const getPayload = (service, data, user_id, listData) => {
	if (service === 'fcl_freight') {
		return formatFclRate(data, user_id);
	}
	if (service === 'air_freight') {
		return formatAirRate(data, user_id);
	}
	if (service === 'air_customs') {
		return formatAirCustomsRate(data, user_id);
	}
	if (service === 'lcl_freight') {
		return formatLclRate(data, user_id);
	}
	if (service === 'ftl_freight') {
		return formatFtlRate(data, user_id);
	}
	if (service === 'fcl_customs') {
		return formatFclCustomsRate(data, user_id);
	}
	if (service === 'lcl_customs') {
		return formatLclCustomsRate(data, user_id);
	}
	if (service === 'haulage') {
		return formatHaulageFreightRate(data, user_id, listData);
	}
	if (service === 'trailer') {
		return formatTrailerFreight(data, user_id);
	}
	if (service === 'ltl_freight') {
		return formatLtlRate(data, user_id);
	}
	if (service === 'fcl_cfs') {
		return formatFclCfs(data, user_id);
	}
	if (service === 'fcl_local') {
		return formatFclLocal(data, user_id, listData);
	}
	if (service === 'air_local') {
		return formatAirLocal(data, user_id, listData);
	}
	return data;
};

const useCreateFreightRate = (service) => {
	const { user_data } = useSelector(({ profile }) => ({
		user_data: profile || {},
	}));
	const { user: { id: user_id = '' } = {} } = user_data;

	const [{ loading }, trigger] = useRequest({
		url    : API_NAME[service],
		method : 'POST',
	}, { manual: true });

	const createRate = async (data, listData, triggeredFrom) => {
		const newPayload = getPayload(service, data, user_id, listData);
		const keyToSend = listData?.sources?.includes('rate_request') && KEYS_TO_SEND[service];

		try {
			const resp = await trigger({
				data: {
					...newPayload,
					source      : triggeredFrom || undefined,
					[keyToSend] : listData?.id || undefined,
				},
			});
			if (resp?.data) { return resp?.data?.id; }
		} catch (error) {
			const { response = {} } = error;
			const { data: err_data = {} } = response;
			const {
				detail = undefined,
				base = undefined,
				line_items = undefined,
				validity_end = undefined,
				length: lengthError = '',
				breadth: breadthError = '',
				height: heightError = '',
				minimum_chargeable_weight = undefined,
				minimum_freight_charge = undefined,
				transit_time = undefined,
				weight_slabs = undefined,
			} = err_data;

			Toast.error(
				startCase(base || lengthError || breadthError || heightError || detail || validity_end
					|| line_items || minimum_chargeable_weight || minimum_freight_charge || transit_time
					|| weight_slabs),
			);
		}
		return null;
	};

	return {
		loading,
		createRate,
	};
};

export default useCreateFreightRate;
