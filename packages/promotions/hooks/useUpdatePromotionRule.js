import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useUpdatePromotionRule = ({ refetch = () => {} }) => {
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/update_promotion_rule',
			method : 'POST',
		},
		{ manual: true },
	);

	const onUpdateAgentRule = async ({ data = {} }) => {
		try {
			await trigger({ data });
			Toast.success('Promotion rule updated');
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

export default useUpdatePromotionRule;
