import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

const useGetSaasComplianceDocs = ({ primary_service = {}, task = {} }) => {
	const { user } = useSelector((state) => state?.profile);
	const { id: userId } = user || {};

	const [{ loading, data }, trigger] = useRequestBf({
		auth   : 'get_saas_trade_engine_documents',
		url    : 'saas/trade-engine/documents',
		method : 'GET',
		params : {
			hsCode            : primary_service?.hs_code?.hs_code_name?.split(' ')?.[GLOBAL_CONSTANTS.zeroth_index],
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
		if (task.task === 'upload_compliance_documents') {
			getComplainceDocs();
		}
	}, [getComplainceDocs, task.task]);

	return {
		docs: data,
		loading,
	};
};

export default useGetSaasComplianceDocs;
