import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';

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
			Toast.error(error.message);
		}
	};

	return {
		loading,
		deactivateBudget,
	};
};

export default useDeactivatePromoBudget;
