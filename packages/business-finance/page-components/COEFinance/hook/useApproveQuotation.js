import { Toast } from '@cogoport/components';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback } from 'react';

import toastApiError from '../../commons/toastApiError.ts';

const getParams = ({
	idList = [],
	status = '',
	id = '',

}) => ({
	ids         : idList,
	status,
	performedBy : id,
});

const useApproveQuotation = ({
	idList = [],
	status = '',
	source = 'Quotation',
}) => {
	const { id = '' } = useSelector((state) => state?.profile?.user);
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
				data: getParams({ idList, status, id }),
			});
			Toast.success(`${source} updated succesfully`);
			refetch();
		} catch (error) {
			toastApiError(error);
		}
	}, [trigger, idList, status, source, id]);

	return {
		approveQuotation,
		approveQuotationLoading: loading,
	};
};
export default useApproveQuotation;
