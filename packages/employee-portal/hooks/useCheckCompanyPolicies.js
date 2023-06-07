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
			console.log('err', err);
		}
	};

	return {
		loading,
		updateEmployeeDetails,
	};
}

export default useCheckCompanyPolicies;
