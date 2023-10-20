import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useCreateEmployeeReaction = ({ refetch, onClose }) => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'POST',
		url    : '/create_employee_reaction',
	}, { manual: true });

	const createEmployeeReaction = async (values) => {
		try {
			await trigger({
				data: {
					...values,
				},
			});
			refetch();
			onClose();
			Toast.success('Details updated successfully');
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
		}
	};

	return { loading, createEmployeeReaction };
};

export default useCreateEmployeeReaction;
