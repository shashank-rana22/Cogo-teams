import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

const useUpdatePricing = ({ id, setIsEditPrice }) => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_saas_plan_pricing',
	}, { manual: true });

	const submitHandler = useCallback(async (price) => {
		try {
			await trigger({
				data: {
					id,
					price,
				},
			});
			setIsEditPrice(false);
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data));
		}
	}, [id, setIsEditPrice, trigger]);

	return {
		loading, submitHandler,
	};
};

export default useUpdatePricing;
