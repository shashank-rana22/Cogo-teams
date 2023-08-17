import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

import getColumns from './getColumns';

const onClickOpen = (url) => {
	window.open(url, '_blank');
};

const useEmployeeData = ({ detail }) => {
	const [{ data, loading }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/list_employee_device_details',
	}, { manual: true });

	const fetch = useCallback(
		() => {
			trigger({
				filters: {
					employee_detail_id : detail?.id,
					status             : 'active',
				},
				page: 1,
			});
		},
		[detail?.id, trigger],
	);

	useEffect(() => {
		fetch();
	}, [fetch]);

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
