import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useUpdatePromotionAgentRule = ({ refetch = () => {} }) => {
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/update_promotion_agent_rule',
			method : 'POST',
		},
		{ manual: true },
	);

	const onUpdateAgentRule = async ({ data = {} }) => {
		try {
			await trigger({ data });
			Toast.success('Promotion agent rule updated');
			refetch();
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
