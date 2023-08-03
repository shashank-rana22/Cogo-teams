import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const getPayload = ({ SOURCE, companyPolicyValue, status, id }) => {
	const payload = { id };

	if (SOURCE === 'save') {
		payload.share_company_policies = !!companyPolicyValue;
	}

	if (SOURCE === 'reject') {
		payload.status = status === 'active' ? 'inactive' : 'active';
	}

	return payload;
};

const useUpdateEmployeeDeatils = ({
	id,
	status,
	getEmployeeDetails = () => {},
	companyPolicyValue = false,
	SOURCE = 'save',
}) => {
	const [{ btnloading }, trigger] = useHarbourRequest({
		url    : '/update_employee_detail',
		method : 'POST',
	}, { manual: true });

	const updateEmployeeStatus = async () => {
		const payload = getPayload({ SOURCE, id, companyPolicyValue, status });

		try {
			await trigger({
				data: payload,
			});

			getEmployeeDetails(id);
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		btnloading,
		updateEmployeeStatus,
	};
};

export default useUpdateEmployeeDeatils;
