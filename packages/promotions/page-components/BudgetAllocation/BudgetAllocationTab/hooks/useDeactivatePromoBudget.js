import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useDeactivatePromoBudget = ({ refetch }) => {
	const {
		general: { scope = '' },
	} = useSelector((state) => state);

	const [{ loading }, trigger] = useRequest(
		{
			url    : '/deactivate_promotion_budget',
			method : 'POST',
			scope,
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
