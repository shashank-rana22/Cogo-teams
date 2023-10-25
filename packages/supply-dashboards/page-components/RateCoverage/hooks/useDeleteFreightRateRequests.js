import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const API_MAPPING = {
	fcl_freight        : 'delete_fcl_freight_rate_request',
	ftl_freight        : 'delete_ftl_freight_rate_request',
	air_freight        : 'delete_air_freight_rate_request',
	lcl_freight        : 'delete_lcl_freight_rate_request',
	ltl_freight        : 'delete_ltl_freight_rate_request',
	fcl_customs        : 'delete_fcl_customs_rate_request',
	fcl_cfs            : 'delete_fcl_cfs_rate_request',
	air_customs        : 'delete_air_customs_rate_request',
	lcl_customs        : 'delete_lcl_customs_rate_request',
	haulage_freight    : 'delete_haulage_freight_rate_request',
	trailer_freight    : 'delete_trailer_freight_rate_request',
	fcl_freight_local  : 'delete_fcl_freight_rate_local_request',
	subsidiary_service : 'delete_subsidiary_service_rate_request',
};

const KEY_TO_SEND = {
	fcl_freight        : 'fcl_freight_rate_request_ids',
	ftl_freight        : 'ftl_freight_rate_request_ids',
	air_freight        : 'air_freight_rate_request_ids',
	lcl_freight        : 'lcl_freight_rate_request_ids',
	ltl_freight        : 'ltl_freight_rate_request_ids',
	fcl_customs        : 'fcl_customs_rate_request_ids',
	fcl_cfs            : 'fcl_cfs_rate_request_ids',
	air_customs        : 'air_customs_rate_request_ids',
	lcl_customs        : 'lcl_customs_rate_request_ids',
	haulage_freight    : 'haulage_freight_rate_request_ids',
	trailer_freight    : 'trailer_freight_rate_request_ids',
	fcl_freight_local  : 'fcl_freight_rate_local_request_ids',
	subsidiary_service : 'subsidiary_service_rate_request_ids',
};

const useDeleteFreightRateRequests = (service = 'fcl_freight') => {
	const apiName = API_MAPPING[service];

	const [{ loading }, trigger] = useRequest({ url: `/${apiName}`, method: 'post' }, { manual: true });

	const deleteRequest = async ({ id, closing_remarks, checkboxValue, remarks }) => {
		const keyToSend = KEY_TO_SEND[service];
		try {
			const body = {
				[keyToSend]     : [id],
				closing_remarks : [checkboxValue || closing_remarks || 'Rate Created'],
				remarks         : remarks || undefined,
			};

			const resp = await trigger({
				data: body,
			});
			if (resp) { return resp?.status; }
		} catch (e) {
			Toast.error('Failed To Cancel');
		}
		return null;
	};

	return {
		loading,
		deleteRequest,
	};
};

export default useDeleteFreightRateRequests;
