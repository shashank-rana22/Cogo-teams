import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const usePublishKamPromotion = () => {
	const [{ loading }, trigger] = useRequest({
		method : 'POST',
		url    : '/publish_kam_promotion',
	}, { manual: true });

	const publishPromotion = async (promotion_id) => {
		try {
			const payload = { id: promotion_id };

			await trigger({ data: payload });
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		}
	};

	return {
		loading,
		publishPromotion,
	};
};

export default usePublishKamPromotion;
