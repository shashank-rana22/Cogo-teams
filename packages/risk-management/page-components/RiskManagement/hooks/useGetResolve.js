import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const DEFAULT_INDEX = 0;
const useGetResolve = ({ itemData, remarks, getDashboardData, getDahboardStatsData }) => {
	const { id, reason } = itemData || {};
	const [{ loading, data }, trigger] = useRequest({
		url    : 'update_shipment_risk_assessment',
		method : 'post',
	}, { manual: true, autoCancel: false });

	const onResolveMark = useCallback((async () => {
		try {
			await trigger({
				params: {
					shipment_id      : id,
					risk_sub_reasons : reason,
					resolved_remark  : remarks,
				},
			});
			getDashboardData();
			getDahboardStatsData();
		} catch (e) {
			Toast.error(e?.response?.data?.id[DEFAULT_INDEX]);
		}
	}), [trigger, id, reason, remarks, getDashboardData, getDahboardStatsData]);

	return {

		resolveLoading : loading,
		resolveData    : data,
		onResolveMark,
	};
};

export default useGetResolve;
