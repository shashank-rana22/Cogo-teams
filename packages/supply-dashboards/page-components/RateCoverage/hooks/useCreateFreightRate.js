import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { startCase } from '@cogoport/utils';

import formatAirCustomsRate from '../payload/format-air-customs-rate';
import formatAirRate from '../payload/format-air-rate';
import formatFclCustomsRate from '../payload/format-fcl-customs-rate';
import formatFclRate from '../payload/format-fcl-rate';
import formatFtlRate from '../payload/format-ftl-rate';
import formatHaulageFreightRate from '../payload/format-haulage-freight-rate';
import formatLclCustomsRate from '../payload/format-lcl-customs-rate';
import formatLclRate from '../payload/format-lcl-rate';
import formatLtlRate from '../payload/format-ltl-rate';
import formatTrailerFreight from '../payload/format-trailer-freight';

const API_NAME = {
	fcl_freight : '/create_fcl_freight_rate',
	air_freight : 'create_air_freight_rate',
	fcl_customs : 'create_fcl_customs_rate',
	haulage     : 'create_haulage_freight_rate',
	lcl_freight : 'create_lcl_freight_rate',
	lcl_customs : 'create_lcl_customs_rate',
	air_customs : 'create_air_customs_rate',
	trailer     : 'create_trailer_freight_rate',
	ltl_freight : 'create_ltl_freight_rate',
	ftl_freight : 'create_ftl_freight_rate',
};

const getPayload = (service, data, user_id) => {
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
		return formatHaulageFreightRate(data, user_id);
	}
	if (service === 'trailer') {
		return formatTrailerFreight(data, user_id);
	}
	if (service === 'ltl_freight') {
		return formatLtlRate(data, user_id);
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

	const createRate = async (data) => {
		const newPayload = getPayload(service, data, user_id);

		try {
			const resp = await trigger({
				data: {
					...newPayload,
				},
			});
			if (resp?.data) { return resp?.data?.id; }
		} catch (err) {
			Toast.error(startCase(err?.response?.data?.detail));
		}
		return null;
	};

	return {
		loading,
		createRate,
	};
};

export default useCreateFreightRate;
