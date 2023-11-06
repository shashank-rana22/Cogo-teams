import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import toastApiError from '../../commons/toastApiError';

const useGetShipmentCostView = ({ jobId = '' }) => {
	const [{ data = {}, loading = false }, trigger] = useRequestBf(
		{
			url     : '/common/job/shipment-cost-sheet',
			authKey : 'get_common_job_shipment_cost_sheet',
			method  : 'get',
		},
		{ manual: true },
	);

	const refetch = useCallback(async () => {
		try {
			await trigger({
				params: {
					jobId,
				},
			});
		} catch (error) {
			toastApiError(error);
		}
	}, [jobId, trigger]);

	useEffect(() => {
		refetch();
	}, [refetch]);

	return {
		costViewData        : data,
		costViewDataLoading : loading,
		refetch,
	};
};
export default useGetShipmentCostView;
