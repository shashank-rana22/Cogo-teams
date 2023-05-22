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
			console.log(err);
		}
	}, [id, setIsEditPrice, trigger]);

	return {
		loading, submitHandler,
	};
};

export default useUpdatePricing;
