import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useHarbourRequest } from '@cogoport/request';

const useCreateGroupDetails = ({ configurationName, getEmployeeReimbursementGroup = () => {} }) => {
	const router = useRouter();

	const [{ btnloading, data }, trigger] = useHarbourRequest({
		url    : '/create_employee_device_reimbursement_group',
		method : 'POST',
	}, { manual: true });

	const createConfigurationGroup = async () => {
		const payload = {
			name: configurationName,
		};
		try {
			await trigger({
				data: payload,
			});
			getEmployeeReimbursementGroup(data.id);
			router.push('/byod/admin-dashboard/configuration');
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		btnloading,
		data,
		createConfigurationGroup,
	};
};

export default useCreateGroupDetails;
