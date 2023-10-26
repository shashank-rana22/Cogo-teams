import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const API = {
	fcl_freight : 'list_fcl_freight_rate_feedbacks',
	air_freight : 'list_air_freight_rate_feedbacks',
	fcl_customs : 'list_fcl_customs_rate_feedbacks',
	haulage     : 'list_haulage_freight_rate_feedbacks',
	lcl_freight : 'list_lcl_freight_rate_feedbacks',
	lcl_customs : 'list_lcl_customs_rate_feedbacks',
	air_customs : 'list_air_customs_rate_feedbacks',
	trailer     : 'list_trailer_freight_rate_feedbacks',
	ltl_freight : 'list_ltl_freight_rate_feedbacks',
	ftl_freight : 'list_ftl_freight_rate_feedbacks',
	fcl_cfs     : 'list_fcl_cfs_rate_feedbacks',
};

const useListFreightRateFeedBacks = ({ filter = {}, source_id }) => {
	const apiName = API[filter?.service];

	const [{ loading, data }, trigger] = useRequest({
		url    : apiName,
		method : 'GET',
	}, { manual: true });

	const getFeedback = useCallback(async () => {
		try {
			await trigger(
				{
					params: {
						filters                  : { id: source_id },
						booking_details_required : true,
					},
				},
			);
		} catch (err) {
			// console.log(err);
		}
	}, [source_id, trigger]);

	return {
		loading,
		data,
		getFeedback,
	};
};

export default useListFreightRateFeedBacks;
