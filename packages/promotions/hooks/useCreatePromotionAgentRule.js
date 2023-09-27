import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useCreatePromotionAgentRule = () => {
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/create_promotion_agent_rule',
			method : 'POST',
		},
		{ manual: true },
	);

	const onSubmit = async ({ data = {} }) => {
		try {
			await trigger({
				data,
			});
		} catch (err) {
			toastApiError(err);
		}
	};
	return {
		onSubmit,
		loading,
	};
};

export default useCreatePromotionAgentRule;
