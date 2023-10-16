import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import toastApiError from '../../commons/toastApiError';

const useGetPrePostShipmentQuotation = ({
	jobId = '',
}) => {
	const [{ data = {}, loading = false }, trigger] = useRequestBf(
		{
			url     : 'common/job/pre-post-shipment-quotation',
			method  : 'get',
			authKey : 'get_common_job_pre_post_shipment_quotation',
		},
		{ manual: true },
	);

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
	};
};

export default useGetPrePostShipmentQuotation;
