import { useRequest } from '@cogoport/request';

import toastApiError from '../utils/toastApiError';

const useDeactivatePromoBudget = ({ refetch = () => {} }) => {
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/deactivate_promotion_budget',
			method : 'POST',
		},
		{ manual: true },
	);

	const deactivateBudget = async (deactivateData) => {
		const { id = '' } = deactivateData;
		try {
			const payload = {
				id,
			};
			await trigger({
				data: payload,
			});
			refetch();
		} catch (error) {
			toastApiError(error);
		}
	};

	return {
		loading,
		deactivateBudget,
	};
};

export default useDeactivatePromoBudget;
