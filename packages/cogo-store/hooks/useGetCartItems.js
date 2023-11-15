import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetCartItems = (coupon_applied) => {
	const [{ data, loading }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/list_cart_items',
	}, { manual: true });

	const getCartDetails = useCallback(
		() => {
			try {
				trigger({
					params: {
						is_coupon_applied: coupon_applied,
					},
				});
			} catch (error) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		},
		[trigger, coupon_applied],
	);

	useEffect(() => {
		getCartDetails();
	}, [getCartDetails]);

	return {
		loading,
		data,
		refetchCartDetails: getCartDetails,
	};
};

export default useGetCartItems;
