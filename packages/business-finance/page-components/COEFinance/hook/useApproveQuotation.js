import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

import toastApiError from '../../commons/toastApiError.ts';

const getParams = ({
	idList = [],
	status = '',

}) => ({
	ids: idList,
	status,
});

const useApproveQuotation = ({
	idList = [],
	status = '',
	source = 'Quotation',
}) => {
	const [{ loading = false }, trigger] = useRequestBf(
		{
			url     : '/common/job/shipment-quotation-status',
			authKey : 'put_common_job_shipment_quotation_status',
			method  : 'put',
		},
		{ manual: true },
	);

	const approveQuotation = useCallback(async (refetch) => {
		try {
			await trigger({
				data: getParams({ idList, status }),
			});
			Toast.success(`${source} updated succesfully`);
			refetch();
		} catch (error) {
			toastApiError(error);
		}
	}, [trigger, idList, status, source]);

	return {
		approveQuotation,
		approveQuotationLoading: loading,
	};
};
export default useApproveQuotation;
