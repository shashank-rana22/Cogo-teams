import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetRiskProneStats = () => {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'fcl_freight/get_risk_prone_shipment_stats',
		method : 'get',
	}, { manual: true, autoCancel: false });

	const getDahboardStatsData = useCallback(() => {
		(async () => {
			try {
				await trigger({
					params: {},
				});
			} catch (err) {
				Toast.error(err.meessage);
			}
		})();
	}, [trigger]);

	useEffect(() => {
		getDahboardStatsData();
	}, [getDahboardStatsData]);

	return {
		statsData    : data,
		statsLoading : loading,
		getDahboardStatsData,
	};
};

export default useGetRiskProneStats;
