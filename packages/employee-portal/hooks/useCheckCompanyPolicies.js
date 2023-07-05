import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

function useCheckCompanyPolicies({
	policy_data,
	policy_id,
	employeeId,
	getEmployeeDetails = () => {},
}) {
	const [{ loading }, trigger] = useHarbourRequest({
		url    : '/update_employee_detail',
		method : 'POST',
	}, { manual: true });

	const updatedPolicyData = {
		...policy_data,
		[policy_id]: true,
	};

	const updateEmployeeDetails = async () => {
		try {
			await trigger({
				data: {
					id            : employeeId,
					policies_data : updatedPolicyData,

				},
			});
			getEmployeeDetails();
		} catch (err) {
			if (err?.response) {
				Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
			}
		}
	};

	return {
		loading,
		updateEmployeeDetails,
	};
}

export default useCheckCompanyPolicies;
