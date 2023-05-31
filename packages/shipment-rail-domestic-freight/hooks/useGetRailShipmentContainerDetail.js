import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { useCallback, useEffect } from 'react';

const useGetRailShipmentContainerDetail = ({ defaultParams = {} }) => {
	const [{ data, loading }, trigger] = useRequest({
		url    : '/get_business',
		method : 'get',
		params : defaultParams,
	}, { manual: true });

	const apiTrigger = useCallback(async () => {
		try {
			await trigger();
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		apiTrigger();
	}, [apiTrigger]);

	return { data, loading, apiTrigger };
};

export default useGetRailShipmentContainerDetail;
