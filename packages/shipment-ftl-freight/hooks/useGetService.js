import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { useEffect, useCallback } from 'react';

function useGetService({ defaultParams = {} }) {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_shipment_service',
		method : 'GET',
		params : {
			...defaultParams,
		},
	}, { manual: true });

	const getService = useCallback(() => {
		(
			async () => {
				try {
					await trigger();
				} catch (err) {
					toastApiError(err);
				}
			}
		)();
	}, [trigger]);

	useEffect(() => {
		getService();
	}, [getService]);

	return {
		loading,
		data: data?.data,
	};
}

export default useGetService;
