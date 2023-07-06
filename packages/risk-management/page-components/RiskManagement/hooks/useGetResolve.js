import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useGetResolve = ({ remarks, getDashboardData, getDahboardStatsData, selectRiskReason }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'update_shipment_fault_alarm',
		method : 'post',
	}, { manual: true, autoCancel: false });

	const getParams = useCallback(() => ({
		id              : selectRiskReason,
		resolved_remark : remarks,
		status          : 'inactive',
	}), [remarks, selectRiskReason]);

	const onResolveMark = useCallback((() => {
		const paramsData = getParams();
		try {
			trigger({
				params: paramsData,
			});
			getDashboardData();
			getDahboardStatsData();
			Toast.success('Resolved Successfully');
		} catch (e) {
			Toast.error(e?.response?.data?.id[GLOBAL_CONSTANTS.zeroth_index]);
		}
	}), [trigger, getDashboardData, getDahboardStatsData, getParams]);

	return {

		resolveLoading : loading,
		resolveData    : data,
		onResolveMark,
	};
};

export default useGetResolve;
