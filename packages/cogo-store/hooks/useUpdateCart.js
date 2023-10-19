import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useUpdateCart = () => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'post',
		url    : '/update_cart',
	}, { manual: true });

	const updateCart = async ({ payload }) => {
		try {
			await trigger({
				data: {
					cart_items: payload,
				},
			});
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
