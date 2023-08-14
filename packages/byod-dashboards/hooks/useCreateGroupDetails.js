import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

import useGetEmployeeReimbursementGroup from './useGetEmployeeReimbursementGroup';

const useCreateGroupDetails = ({ configurationName }) => {
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
			useGetEmployeeReimbursementGroup(data.id);
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
