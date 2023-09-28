import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useDeactivatePromotionRule = () => {
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/update_promotion_rule',
			method : 'POST',
		},
		{ manual: true },
	);

	const onUpdateStatus = async ({ data = {}, refetchList = () => {} }) => {
		try {
			await trigger({
				data,
			});
			refetchList();
		} catch (err) {
			toastApiError(err);
		}
	};

	return { loading, onUpdateStatus };
};

export default useDeactivatePromotionRule;
