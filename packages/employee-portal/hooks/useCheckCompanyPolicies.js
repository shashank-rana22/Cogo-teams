import { useHarbourRequest } from '@cogoport/request';

function useCheckCompanyPolicies({
	policy_data,
	policy_id,
	user_id = 'a55d29e4-b045-4023-99c1-a2790948e061',
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
					id                : user_id,
					policies_data     : updatedPolicyData,
					performed_by_id   : '5674cb',
					performed_by_type : '2314fb',

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
