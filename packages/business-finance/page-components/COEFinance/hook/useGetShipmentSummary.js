import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import toastApiError from '../../commons/toastApiError';

function useGetShipmentSummary({ jobId = '' }) {
	const [{ loading = false, data = {} }, trigger] = useRequestBf({
		url     : '/common/job-profitability/shipment-summary',
		method  : 'GET',
		authKey : 'get_common_job_profitability_shipment_summary',
	}, { manual: true });

	const getShipmentSummary = useCallback(async () => {
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
		getShipmentSummary();
	}, [getShipmentSummary]);

	return {
		loading,
		data,
	};
}

export default useGetShipmentSummary;
