import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useCreatePromotionAgentRule = ({ refetch = () => {} }) => {
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/create_promotion_agent_rule',
			method : 'POST',
		},
		{ manual: true },
	);

	const onSubmit = async ({ data = {} }) => {
		try {
			await trigger({ data });
			Toast.success('Created Successfully');
			refetch();
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
