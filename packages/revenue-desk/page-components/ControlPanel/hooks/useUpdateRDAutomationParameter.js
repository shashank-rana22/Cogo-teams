import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';

const useUpdateRDAutomationParameter = ({ refetch = () => {} }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_revenue_desk_automation_parameter',
		method : 'post',
	}, { manual: true });

	const updateRDAutomationParameter = async (id) => {
		try {
			await trigger({ params: { id, status: 'in_active' } });
			refetch();
		} catch (err) {
			toastApiError(err);
		}
	};

	return { updateRDAutomationParameter, loading };
};

export default useUpdateRDAutomationParameter;
