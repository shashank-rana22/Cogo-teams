import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useUpdateCart = (refetch) => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'post',
		url    : '/update_cart',
	}, { manual: true });

	const updateCart = async ({ payload, showToast = false }) => {
		try {
			await trigger({
				data: {
					cart_items: payload,
				},
			});
			refetch();
			if (!showToast) {
				Toast.success('Successfully added to cart!');
			}
		} catch (error) {
			if (error?.response?.data) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		}
	};

	return {
		loading,
		updateCart,
	};
};

export default useUpdateCart;
