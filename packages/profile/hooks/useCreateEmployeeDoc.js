import { Toast } from '@cogoport/components';
import { useHarbourRequest } from '@cogoport/request';

const useCreateEmployeeDoc = ({ getEmployeeDetails, employee_detail_id, reset = () => {} }) => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'post',
		url    : '/create_employee_document',
	}, { manual: true });

	const createEmployeeDoc = async (payload) => {
		try {
			await trigger({
				data: { ...payload, employee_detail_id },
			});
			getEmployeeDetails();
		} catch (error) {
			if (error?.response?.data) { Toast.error(error?.response?.data?.message); }
		}
		reset();
	};

	return {
		loading,
		createEmployeeDoc,
	};
};

export default useCreateEmployeeDoc;
