import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const useGetOrderDetails = ({ id }) => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/get_order_details',
	}, { manual: true });

	const getOrderDetails = useCallback(
		async () => {
			try {
				await trigger({
					params: {
						order_id: id,
					},
				});
			} catch (error) {
				if (error?.response?.data) {
					Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
				}
			}
		},
		[id, trigger],
	);

	useEffect(() => {
		getOrderDetails();
	}, [getOrderDetails]);

	return { loading, data, getOrderDetails };
};

export default useGetOrderDetails;
