import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

import getColumns from './getColumns';

const useTableView = ({ search }) => {
	const router = useRouter();
	const [activeTab, setActiveTab] = useState('active');
	const [page, setPage] = useState(1);
	const [filters, setFilters] = useState();

	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'get',
		url    : '/list_employee_details',
	}, { manual: true });

	const fetch = useCallback(
		async () => {
			try {
				await trigger({
					params: {
						filters: {
							q              : search || undefined,
							status         : activeTab,
							joining_after  : filters?.joining_date?.startDate || undefined,
							joining_before : filters?.joining_date?.endDate || undefined,
							designation    : filters?.roles || undefined,
						},
						page,
					},
				});
			} catch (error) {
				Toast.error(getApiErrorString(error.response?.data));
			}
		},
		[activeTab, search, trigger, page, filters],
	);

	useEffect(() => {
		fetch();
	}, [fetch, search]);

	const onClickNewJoinerColumn = (id) => {
		router.push(`/new-employee-dashboard/${id}`, `/new-employee-dashboard/${id}`);
	};

	const columns = getColumns({ onClickNewJoinerColumn });

	return {
		columns,
		loading,
		list: data?.list || [],
		data,
		setActiveTab,
		activeTab,
		page,
		setPage,
		filters,
		setFilters,
	};
};

export default useTableView;
