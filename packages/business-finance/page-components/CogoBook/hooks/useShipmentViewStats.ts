import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import toastApiError from '../../commons/toastApiError';

interface ShipmentInterface {
	month?:string
	year?:string
	entityCode?:string
}
const useShipmentViewStats = ({ year, month, entityCode }:ShipmentInterface) => {
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
					entityCode : entityCode || undefined,
				},
			});
		} catch (error) {
			toastApiError(error);
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
