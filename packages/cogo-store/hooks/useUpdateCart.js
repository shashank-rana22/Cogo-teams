import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useUpdateCart = () => {
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
			if (showToast) {
				Toast.success('Successfully added to cart!');
			}
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		loading,
		updateCart,
	};
};

export default useUpdateCart;
