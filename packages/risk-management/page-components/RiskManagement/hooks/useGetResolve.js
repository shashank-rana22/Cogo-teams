import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const DATA_FIRST_INDEX = 0;
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
			Toast.success('Resolved Successfully');
		} catch (e) {
			Toast.error(e?.response?.data?.id[DATA_FIRST_INDEX]);
		}
	}), [trigger, id, reason, remarks, getDashboardData, getDahboardStatsData]);

	return {

		resolveLoading : loading,
		resolveData    : data,
		onResolveMark,
	};
};

export default useGetResolve;
