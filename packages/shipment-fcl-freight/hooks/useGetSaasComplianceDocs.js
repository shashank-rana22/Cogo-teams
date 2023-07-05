import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequestBf } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetSaasComplianceDocs = () => {
	const [{ loading, data }, trigger] = useRequestBf({
		auth   : 'get_saas_trade_engine_documents',
		url    : 'saas/trade-engine/documents',
		method : 'GET',
		params : {
			hsCode            : '29024400',
			originPortId      : 'eb187b38-51b2-4a5e-9f3c-978033ca1ddf',
			destinationPortId : '33470eb3-0a63-4427-bf7e-b68d043364dc',
			performedBy       : '2e6dbab1-5658-4c95-a242-04b22f11272c',
		},
	}, { manual: true });

	const getComplainceDocs = useCallback(async () => {
		try {
			await trigger({});
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		getComplainceDocs();
	}, [getComplainceDocs]);

	return {
		docs: data,
		loading,
	};
};
export default useGetSaasComplianceDocs;
