import { Toast } from '@cogoport/components';
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
	source = 'Quotation',
}) => {
	const [{ loading = false }, trigger] = useRequestBf(
		{
			url     : '/common/job/update-shipment-quotation-status',
			authKey : 'post_common_job_update_shipment_quotation_status',
			method  : 'post',
		},
		{ manual: true },
	);

	const approveQuotation = useCallback(async (cb, refetch) => {
		try {
			await trigger({
				data: getParams({ id, status, remarks }),
			});
			Toast.success(`${source} updated succesfully`);
			cb();
			refetch();
		} catch (error) {
			toastApiError(error);
		}
	}, [trigger, id, status, remarks, source]);

	return {
		approveQuotation,
		approveQuotationLoading: loading,
	};
};
export default useApproveQuotation;
