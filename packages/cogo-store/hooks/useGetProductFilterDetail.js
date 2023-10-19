import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const useGetProductFilterDetail = () => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : './get_product_filter_details',
	}, { manual: true });

	const getProductFilterDetail = useCallback(
		async () => {
			try {
				await trigger();
			} catch (error) {
				if (error?.response?.data) {
					Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
				}
			}
		},
		[trigger],
	);

	useEffect(() => {
		getProductFilterDetail();
	}, [getProductFilterDetail]);

	return { loading, data, getProductFilterDetail };
};

export default useGetProductFilterDetail;
