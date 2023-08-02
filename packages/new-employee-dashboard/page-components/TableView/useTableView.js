import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

import getColumns from './getColumns';
import useGetZipFile from './useGetZipFile';

const INITIAL_PAGE = 1;

const useTableView = ({ search, btnloading, updateEmployeeStatus, bulkAction }) => {
	const router = useRouter();
	const [activeTab, setActiveTab] = useState('active');
	const [page, setPage] = useState(INITIAL_PAGE);
	const [filters, setFilters] = useState({});

	const [{ loading, data }, trigger] = useHarbourRequest(
		{
			method : 'get',
			url    : '/list_employee_details',
		},
		{ manual: true },
	);

	const fetch = useCallback(async () => {
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
					page: search ? INITIAL_PAGE : page,
				},
			});
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		}
	}, [activeTab, search, trigger, page, filters]);

	useEffect(() => {
		fetch();
	}, [fetch, search]);

	const onClickNewJoinerColumn = (id) => {
		router.push(
			`/new-employee-dashboard/${id}`,
			`/new-employee-dashboard/${id}`,
		);
	};

	const { downloadDocuments, loading:documentLoading } = useGetZipFile();

	let columns = getColumns({
		onClickNewJoinerColumn,
		btnloading,
		updateEmployeeStatus,
		fetch,
		downloadDocuments,
		documentLoading,
		bulkAction,
		data,
	});

	if (activeTab !== 'rejected_by_user') {
		columns = columns.filter((item) => item.Header !== 'ACTION');
	}

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
		fetch,
	};
};

export default useTableView;
