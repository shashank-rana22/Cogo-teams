import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useUpdateDepartmentRole = ({ groupId = '', getEmployeeReimbursementGroup = () => {} }) => {
	const [{ btnloading }, trigger] = useHarbourRequest({
		url    : '/update_department_role_reimbursement_group_mapping',
		method : 'POST',
	}, { manual: true });

	const updateDepartmentRoleReimbursement = async ({ id }) => {
		try {
			const payload = {
				id,
				status: 'inactive',
			};

			await trigger({
				data: payload,
			});

			getEmployeeReimbursementGroup(groupId);
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		btnloading,
		updateDepartmentRoleReimbursement,
	};
};

export default useUpdateDepartmentRole;
