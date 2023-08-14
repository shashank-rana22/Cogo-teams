import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useHarbourRequest } from '@cogoport/request';

const useCreateDepartmentRole = ({ departmentValue, designationValue, id }) => {
	const router = useRouter();

	const [{ btnloading, data }, trigger] = useHarbourRequest({
		url    : '/create_department_role_reimbursement_group_mapping',
		method : 'POST',
	}, { manual: true });

	const createDepartmentRoleReimbursement = async () => {
		const payload = {
			department_master_id                   : departmentValue,
			role_master_id                         : designationValue,
			employee_device_reimbursement_group_id : id,
		};
		try {
			await trigger({
				data: payload,
			});
			router.push('/byod/admin-dashboard/configuration');
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
