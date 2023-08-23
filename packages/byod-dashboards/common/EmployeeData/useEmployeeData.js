import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

import getColumns from './getColumns';

const DEFAULT_PAGE = 1;

const onClickOpen = (url) => {
	window.open(url, '_blank');
};

const useEmployeeData = ({ detail, refetchReimbursementList, setRefetchReimbursementList }) => {
	const [page, setPage] = useState(DEFAULT_PAGE);

	const [{ data, loading }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/list_employee_device_details',
	}, { manual: true });

	const fetch = useCallback(
		async () => {
			await trigger({
				params: {
					filters: {
						employee_detail_id: detail?.id,
					},
					page,
				},
			});

			setRefetchReimbursementList(false);
		},
		[detail?.id, page, setRefetchReimbursementList, trigger],
	);

	useEffect(() => {
		if (refetchReimbursementList) fetch();
	}, [fetch, refetchReimbursementList]);

	useEffect(() => {
		setRefetchReimbursementList(true);
	}, [page, setRefetchReimbursementList]);

	const columns = getColumns({ onClickOpen });

	const { list = [], ...paginationData } = data || {};

	const NEW_LIST = (list || []).flatMap((item) => {
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
		page,
		setPage,
		paginationData,
	};
};

export default useEmployeeData;
