import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';

const useUpdateEmployee = ({ handleModal = () => {}, getEmployeeDetails }) => {
	const [{ loading }, trigger] = useHarbourRequest({
		method : 'post',
		url    : '/update_employee_directory',
	}, { manual: true });

	const { profile } = useSelector((state) => state);

	const updateEmployeeDetails = async (payload) => {
		console.log('payload', payload);
		try {
			await trigger({
				data: { ...payload, user_id: profile?.user?.id },
			});
			getEmployeeDetails();
			handleModal();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data));
		}
	};

	return {
		loading,
		updateEmployeeDetails,
	};
};

export default useUpdateEmployee;
