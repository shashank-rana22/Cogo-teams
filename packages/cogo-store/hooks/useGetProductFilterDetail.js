import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useHarbourRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const useGetProductFilterDetail = () => {
	const geo = getGeoConstants();
	const { country } = geo || {};
	const { code } = country || {};

	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_product_filter_details',
	}, { manual: true });

	const getProductFilterDetail = useCallback(
		async () => {
			try {
				await trigger({
					params: {
						currency_code: code,
					},
				});
			} catch (error) {
				if (error?.response?.data) {
					Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
				}
			}
		},
		[code, trigger],
	);

	useEffect(() => {
		getProductFilterDetail();
	}, [getProductFilterDetail]);

	return { loading, data, refetch: getProductFilterDetail };
};

export default useGetProductFilterDetail;
