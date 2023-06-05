import { Toast } from '@cogoport/components';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const useShipmentViewStats = ({ year, month, entityCode }) => {
	const [
		{ data:shipmentViewData, loading:shipmentViewLoading },
		trigger,
	] = useRequestBf(
		{
			url     : '/pnl/dashboard/job-closure-details',
			method  : 'get',
			authKey : 'get_pnl_dashboard_job_closure_details',
		},
		{ manual: true },
	);

	const refetch = useCallback(async () => {
		try {
			await trigger({
				params: {
					Year       : year || undefined,
					Month      : month || undefined,
					entityCode : entityCode || Object.keys(GLOBAL_CONSTANTS.cogoport_entities)[2],
				},
			});
		} catch (error) {
			if (error?.response?.data?.message) {
				Toast.error(error?.response?.data?.message);
			}
		}
	}, [entityCode, month, trigger, year]);

	useEffect(() => {
		refetch();
	}, [refetch]);

	return {
		shipmentViewData,
		shipmentViewLoading,
	};
};
export default useShipmentViewStats;
