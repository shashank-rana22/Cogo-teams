import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useListFreightRateFeedBacks = ({ filter = {}, source_id }) => {
	const API = {
		fcl_freight     : 'list_fcl_freight_rate_feedbacks',
		air_freight     : 'list_air_freight_rate_feedbacks',
		fcl_customs     : 'list_fcl_customs_rate_feedbacks',
		haulage_freight : 'list_haulage_freight_rate_feedbacks',
	};

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
						filters: { id: source_id },
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
