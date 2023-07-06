import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

const FIRST_VAL = 0;

const useGetSaasComplianceDocs = ({ primary_service }) => {
	const { user } = useSelector((state) => state?.profile);
	const { id: userId } = user || {};

	const [{ loading, data }, trigger] = useRequestBf({
		auth   : 'get_saas_trade_engine_documents',
		url    : 'saas/trade-engine/documents',
		method : 'GET',
		params : {
			hsCode            : primary_service?.hs_code?.hs_code_name?.split(' ')?.[FIRST_VAL],
			originPortId      : primary_service?.origin_port?.country_id,
			destinationPortId : primary_service?.destination_port?.country_id,
			performedBy       : userId,
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
