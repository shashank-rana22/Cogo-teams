import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useState } from 'react';

const MIN_RATING = 0;

const useUpdateEmployeeManualTarget = ({ item }) => {
	const [{ loading }, trigger] = useHarbourRequest({
		url    : '/update_employee_manual_target',
		method : 'POST',
	}, { manual: true });

	const [inputValue, setInputValue] = useState(MIN_RATING);

	const updateEmployeeManualTarget = async (val) => {
		try {
			await trigger({
				data: {
					employee_id           : item.employee_id,
					manager_id            : item.manager_id,
					kra_id                : item.kra_id,
					target_achieved_value : val,
					start_date            : '2023-06-21',
					end_date              : '2023-07-20',
				},
			});

			Toast.success('Rating has been updated successfully');
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
		}
	};

	return {
		updateEmployeeManualTarget,
		loading,
		inputValue,
		setInputValue,
	};
};

export default useUpdateEmployeeManualTarget;
