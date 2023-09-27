import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useUpdatePromotionAgentRule = () => {
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/update_promotion_agent_rule',
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

export default useUpdatePromotionAgentRule;
