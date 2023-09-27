import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useUpdatePromotionRule = () => {
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/update_promotion_rule',
			method : 'POST',
		},
		{ manual: true },
	);

	const onUpdateAgentRule = async ({ data = {} }) => {
		try {
			await trigger({
				data,
			});
		} catch (err) {
			toastApiError(err);
		}
	};
	return {
		onUpdateAgentRule,
		loading,
	};
};

export default useUpdatePromotionRule;
