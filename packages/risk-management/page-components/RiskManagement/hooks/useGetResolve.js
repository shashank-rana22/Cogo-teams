import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useGetResolve = ({ itemData, remarks, getDashboardData, getDahboardStatsData }) => {
	const { id, risk_reason } = itemData || {};
	const [{ loading, data }, trigger] = useRequest({
		url    : 'update_shipment_risk_assessment',
		method : 'post',
	}, { manual: true, autoCancel: false });

	const onResolveMark = useCallback((async () => {
		try {
			await trigger({
				params: {
					shipment_id      : id,
					risk_sub_reasons : risk_reason,
					resolved_remark  : remarks,
				},
			});
			getDashboardData();
			getDahboardStatsData();
			Toast.success('Resolved Successfully');
		} catch (e) {
			Toast.error(e?.response?.data?.id[GLOBAL_CONSTANTS.zeroth_index]);
		}
	}), [trigger, id, risk_reason, remarks, getDashboardData, getDahboardStatsData]);

	return {

		resolveLoading : loading,
		resolveData    : data,
		onResolveMark,
	};
};

export default useGetResolve;
