import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetOrganization = ({ primary_service = {}, task = {} }) => {
	const [{ loading, data: orgData }, trigger] = useRequest({
		url    : '/get_organization',
		method : 'GET',
		params : {
			id: primary_service?.service_provider?.id,
		},
	}, { manual: true });

	const getTradeData = useCallback(async () => {
		try {
			await trigger();
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		if (task?.task === 'mark_confirmed' && primary_service?.trade_type === 'export') {
			getTradeData();
		}
	}, [getTradeData, task, primary_service?.trade_type]);

	return {
		loading,
		orgData,
		orgRefetch: getTradeData,
	};
};
export default useGetOrganization;
