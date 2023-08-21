import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useListEmployeeDeviceReimbursementGroups = () => {
	const [{ data, loading }, trigger] = useHarbourRequest({
		url    : 'list_employee_device_reimbursement_groups',
		method : 'GET',
	}, { manual: true });

	const getListEmployeeDeviceReimbursementGroups = useCallback(
		() => {
			trigger({
				params: {
					filters: {
						status: 'active',
					},
				},
			});
		},
		[trigger],
	);
	useEffect(() => {
		getListEmployeeDeviceReimbursementGroups();
	}, [getListEmployeeDeviceReimbursementGroups]);

	return { data, loading, getListEmployeeDeviceReimbursementGroups };
};

export default useListEmployeeDeviceReimbursementGroups;
