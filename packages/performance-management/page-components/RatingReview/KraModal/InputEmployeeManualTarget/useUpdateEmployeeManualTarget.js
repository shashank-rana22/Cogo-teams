import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { format } from '@cogoport/utils';
import { useState } from 'react';

const MIN_RATING = 0;

const useUpdateEmployeeManualTarget = ({ item, data, selectCycle, employeeKraDetails }) => {
	const { end_date, start_date } = selectCycle || {};

	const [inputValue, setInputValue] = useState(MIN_RATING);

	const [{ loading }, trigger] = useHarbourRequest({
		url    : '/update_employee_manual_target',
		method : 'POST',
	}, { manual: true });

	const updateEmployeeManualTarget = async (val) => {
		try {
			await trigger({
				data: {
					employee_id           : data?.employee_details?.employee_id,
					manager_id            : data?.employee_details?.manager_id,
					kra_id                : item.kra_id,
					target_achieved_value : val,
					start_date            : format(start_date, 'yyyy-MM-dd'),
					end_date              : format(end_date, 'yyyy-MM-dd'),
				},
			});

			employeeKraDetails();
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
