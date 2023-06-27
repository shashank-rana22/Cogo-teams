import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

const useUpdateEmployeeManualTarget = ({ kra_id }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_employee_manual_target',
		method : 'POST',
	}, { manual: true });

	const updateEmployeeManualTarget = async (val) => {
		try {
			await trigger({
				data: {
					employee_id           : 'be1062c9-09bc-4bb1-89c6-e41d0c9233ee',
					manager_id            : '',
					kra_id,
					target_achieved_value : val,
					start_date            : '2023-06-21',
					end_date              : '2023-07-20',
				},
			});

			Toast.success('Sucessfully Update Rating');
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		updateEmployeeManualTarget,
		loading,
	};
};

export default useUpdateEmployeeManualTarget;
