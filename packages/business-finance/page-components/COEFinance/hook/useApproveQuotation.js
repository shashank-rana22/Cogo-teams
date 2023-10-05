import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

import toastApiError from '../../commons/toastApiError.ts';

const getParams = ({
	id = '',
	status = '',
	remarks = '',

}) => ({
	id,
	status,
	remarks,
});

const useApproveQuotation = ({
	id = '',
	status = '',
	remarks = '',
}) => {
	const [{ loading = false }, trigger] = useRequestBf(
		{
			url     : '/common/job/update-shipment-quotation-status',
			authKey : 'post_common_job_update_shipment_quotation_status',
			method  : 'post',
		},
		{ manual: true },
	);

	const approveQuotation = useCallback(async () => {
		try {
			await trigger({
				data: getParams({ id, status, remarks }),
			});
		} catch (error) {
			toastApiError(error);
		}
	}, [trigger, id, status, remarks]);

	return {
		approveQuotation,
		approveQuotationLoading: loading,
	};
};
export default useApproveQuotation;
