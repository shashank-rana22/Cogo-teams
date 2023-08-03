import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequestBf } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

const useGetSaasComplianceDocs = ({ primary_service = {}, task = {}, servicesList = [] }) => {
	const { user } = useSelector((state) => state?.profile);
	const { id: userId } = user || {};

	const customs_service = servicesList?.filter((item) => item?.id === task?.service_id)
		?.[GLOBAL_CONSTANTS.zeroth_index];

	const params = {
		hsCode            : customs_service?.recommended_hs_code,
		originPortId      : primary_service?.origin_port?.country_id,
		destinationPortId : primary_service?.destination_port?.country_id,
		performedBy       : userId,
	};

	const [{ loading, data }, trigger] = useRequestBf({
		auth   : 'get_saas_trade_engine_documents',
		url    : 'saas/trade-engine/documents',
		method : 'GET',
		params,
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
