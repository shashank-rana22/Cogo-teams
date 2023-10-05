import { useRequestBf } from '@cogoport/request';
import { useCallback } from 'react';

import toastApiError from '../../commons/toastApiError.ts';

const useGetDocumentList = ({
	id = '',
	status = '',
}) => {
	const [{ approveQuotationLoading }, approveQuotationTrigger] = useRequestBf(
		{
			url     : '/common/job/update-shipment-quotation-status',
			authKey : 'post_common_job_update_shipment_quotation_status',
			method  : 'post',
		},
		{ manual: true },
	);

	const approveQuotation = useCallback(() => {
		const params = {
			id     : id || undefined,
			status : status || undefined,
		};
		const func = async () => {
			try {
				await approveQuotationTrigger({
					data: params,
				});
			} catch (error) {
				toastApiError(error);
			}
		};
		func();
	}, [approveQuotationTrigger, id, status]);

	return {
		approveQuotation,
		approveQuotationLoading,
	};
};
export default useGetDocumentList;
