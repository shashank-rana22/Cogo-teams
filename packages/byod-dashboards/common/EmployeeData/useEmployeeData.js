import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import getColumns from './getColumns';

const onClickOpen = (url) => {
	window.open(url, '_blank');
};

const useEmployeeData = ({ detail, refetchReimbursementList, setRefetchReimbursementList }) => {
	const [{ data, loading }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/list_employee_device_details',
	}, { manual: true });

	const fetch = useCallback(
		async () => {
			await trigger({
				params: {
					filters: {
						employee_detail_id : detail?.id,
						status             : 'active',
					},
					page: 1,
				},
			});

			setRefetchReimbursementList(false);
		},
		[detail?.id, setRefetchReimbursementList, trigger],
	);

	useEffect(() => {
		if (refetchReimbursementList) fetch();
	}, [fetch, refetchReimbursementList]);

	const columns = getColumns({ onClickOpen });

	const NEW_LIST = (data?.list || []).flatMap((item) => {
		const { updated_at, invoice_url, rejection_reason, status } = item || {};

		return (item?.device_details || []).map((device_detail) => ({
			...device_detail,
			updated_at,
			invoice_url,
			status,
			rejection_reason,
		}));
	});

	return {
		loading,
		NEW_LIST,
		columns,
	};
};

export default useEmployeeData;
