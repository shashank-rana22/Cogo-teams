import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

const useGetEmployeeReimbursementGroup = (groupId = '') => {
	const { query:{ id } } = useSelector(({ general }) => ({
		query: general?.query || {},
	}));

	const [{ data, btnloading }, trigger] = useHarbourRequest({
		url    : '/get_employee_device_reimbursement_group',
		method : 'GET',
	}, { manual: true });

	const getEmployeeReimbursementGroup = useCallback(
		() => {
			try {
				trigger({
					params: { id: id || groupId || '' },
				});
			} catch (err) {
				Toast.error(getApiErrorString(err?.response?.data) || 'Something went wrong');
			}
		},
		[id, groupId, trigger],
	);

	useEffect(() => {
		getEmployeeReimbursementGroup();
	}, [getEmployeeReimbursementGroup]);

	return {
		btnloading,
		data,
		getEmployeeReimbursementGroup,
	};
};

export default useGetEmployeeReimbursementGroup;
