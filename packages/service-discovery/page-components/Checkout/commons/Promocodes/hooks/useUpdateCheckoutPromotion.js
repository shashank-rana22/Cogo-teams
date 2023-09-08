import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

const useUpdateCheckoutPromotion = ({ checkout_id }) => {
	const [{ loading, data = {} }, trigger] = useRequest(
		{
			method : 'get',
			url    : '/update_checkout_promotion',
		},
		{ manual: true },
	);

	const updateCheckoutPromotion = async (promotion_id, status = 'active') => {
		const res = await trigger({
			params: { id: checkout_id, promotion_id, status },
		});

		if (res.hasError) {
			Toast.warn('cannot apply discount');
			return false;
		}

		return true;
	};

	return {
		checkoutLoading: loading,
		updateCheckoutPromotion,
		data,
	};
};

export default useUpdateCheckoutPromotion;
