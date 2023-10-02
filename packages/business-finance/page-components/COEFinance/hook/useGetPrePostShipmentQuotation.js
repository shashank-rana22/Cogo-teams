import { useRequestBf } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import toastApiError from '../../commons/toastApiError.ts';

const useGetPrePostShipmentQuotation = ({
	job_id = '',
}) => {
	const [{ data, loading }, trigger] = useRequestBf(
		{
			url     : 'common/job/pre-post-shipment-quotation',
			method  : 'get',
			authKey : 'get_common_job_pre_post_shipment_quotation',
		},
		{ manual: true },
	);

	const getPrePostShipmentQuots = useCallback(async () => {
		try {
			await trigger({
				params: {
					jobId: job_id,
				},
			});
		} catch (error) {
			toastApiError(error);
		}
	}, [job_id, trigger]);

	useEffect(() => {
		getPrePostShipmentQuots();
	}, [getPrePostShipmentQuots]);

	return {
		data,
		loading,
		getPrePostShipmentQuots,
	};
};

export default useGetPrePostShipmentQuotation;
