import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';

const useCreateDepartmentRole = ({ departmentValue, designationValue, id, setShowAddDept = () => {} }) => {
	const [{ btnloading, data }, trigger] = useHarbourRequest({
		url    : '/create_department_role_reimbursement_group_mapping',
		method : 'POST',
	}, { manual: true });

	const createDepartmentRoleReimbursement = async () => {
		try {
			const payload = {
				department_master_id                   : departmentValue,
				role_master_id                         : designationValue,
				employee_device_reimbursement_group_id : id,
			};
			await trigger({
				data: payload,
			});

			setShowAddDept(false);
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		btnloading,
		data,
		createDepartmentRoleReimbursement,
	};
};

export default useCreateDepartmentRole;
