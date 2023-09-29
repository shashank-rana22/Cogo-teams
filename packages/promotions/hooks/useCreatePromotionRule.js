import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useCreatePromotionRule = ({ refetch = () => {} }) => {
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/create_promotion_rule',
			method : 'POST',
		},
		{ manual: true },
	);

	const onSubmit = async ({ data = {} }) => {
		try {
			await trigger({ data });
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

export default useCreatePromotionRule;
