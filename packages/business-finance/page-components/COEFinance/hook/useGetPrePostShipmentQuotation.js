import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import toastApiError from '../../commons/toastApiError';

const useGetPrePostShipmentQuotation = ({
	jobId = '',
	shipment_id = '',
}) => {
	const [{ data = {}, loading = false }, trigger] = useRequestBf(
		{
			url     : 'common/job/pre-post-shipment-quotation',
			method  : 'get',
			authKey : 'get_common_job_pre_post_shipment_quotation',
		},
		{ manual: true },
	);

	const [{ loading:syncLoading }, triggerSync] = useRequestBf(
		{
			url     : 'common/job/sync-quotations',
			method  : 'post',
			authKey : 'post_common_job_sync_quotations',
		},
		{ manual: true },
	);

	const getRealtimeShipmentQuotes = async () => {
		try {
			await triggerSync({
				params: {
					shipmentId: shipment_id,
				},
			});
			await trigger({
				params: {
					jobId,
				},
			});
		} catch (err) {
			toastApiError(err);
		}
	};

	const getPrePostShipmentQuotes = useCallback(async () => {
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
		getPrePostShipmentQuotes();
	}, [getPrePostShipmentQuotes]);

	return {
		data,
		loading,
		getPrePostShipmentQuotes,
		syncLoading,
		getRealtimeShipmentQuotes,
	};
};

export default useGetPrePostShipmentQuotation;
