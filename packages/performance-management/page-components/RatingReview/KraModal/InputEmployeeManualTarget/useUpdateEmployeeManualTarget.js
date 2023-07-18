import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useState } from 'react';

import { formattedDate } from '../../../../common/formattedDate';

const MIN_RATING = 0;

const getPayload = ({ data, item, val, selectCycle }) => {
	const { end_date, start_date } = selectCycle || {};
	const getData = {
		data: {
			employee_id           : data?.employee_details?.employee_id,
			manager_id            : data?.employee_details?.manager_id,
			kra_id                : item.kra_id,
			target_achieved_value : val,
			start_date            : formattedDate(start_date),
			end_date              : formattedDate(end_date),
		},
	};
	return { getData };
};

const useUpdateEmployeeManualTarget = ({ item, data, selectCycle, employeeKraDetails }) => {
	const [inputValue, setInputValue] = useState(MIN_RATING);

	const [{ loading }, trigger] = useHarbourRequest({
		url    : '/update_employee_manual_target',
		method : 'POST',
	}, { manual: true });

	const updateEmployeeManualTarget = async (val) => {
		const payLoad = getPayload({ selectCycle, item, data, val });
		try {
			await trigger({
				data: payLoad,
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
