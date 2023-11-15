import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

function useUpdateEmployeeDetails({
	id,
	TO_ADD,
	getEmployeeDetails = () => {},
	setShow = () => {},
}) {
	const [{ loading }, trigger] = useHarbourRequest(
		{
			url    : '/update_employee_detail',
			method : 'POST',
		},
		{ manual: true },
	);

	const updateEmployeeDetails = async (values = {}) => {
		try {
			await trigger({
				data: {
					id,
					to_add                     : TO_ADD,
					employee_education_details : [{
						...values,
						degree_proof: values?.degree_proof?.finalUrl || values?.degree_proof,
					}],

				},
			});

			setShow('');
			getEmployeeDetails();
			Toast.success('Details have been saved successfully!');
		} catch (err) {
			Toast.error(
				getApiErrorString(err?.response?.data) || 'Something went wrong',
			);
		}
	};

	return {
		loading,
		updateEmployeeDetails,
	};
}

export default useUpdateEmployeeDetails;
