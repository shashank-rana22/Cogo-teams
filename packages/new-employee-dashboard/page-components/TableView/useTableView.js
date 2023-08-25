import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRouter } from '@cogoport/next';
import { useHarbourRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback, useState } from 'react';

import getColumns from './getColumns';
import useGetZipFile from './useGetZipFile';

const INITIAL_PAGE = 1;
const INITIAL_PAGE_LIMIT = 10;

const useTableView = ({
	btnloading, updateEmployeeStatus, bulkAction,
	selectedIds, setSelectedIds,
}) => {
	const router = useRouter();
	const profileData = useSelector(({ profile }) => profile);

	const { user } = profileData || {};
	const { new_hire_dashboard } = user || {};

	const [activeTab, setActiveTab] = useState(new_hire_dashboard?.activeTab || 'offered');
	const [page, setPage] = useState(new_hire_dashboard?.page || INITIAL_PAGE);
	const [filters, setFilters] = useState(new_hire_dashboard?.filters || {});
	const [search, setSearch] = useState(new_hire_dashboard?.search || '');
	const [pageLimit, setPageLimit] = useState(new_hire_dashboard?.page_limit || INITIAL_PAGE_LIMIT);

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
						q               : search || undefined,
						employee_status : activeTab,
						joining_after   : filters?.joining_date?.startDate || undefined,
						joining_before  : filters?.joining_date?.endDate || undefined,
						role_id         : filters?.roles || undefined,
						department_id   : filters?.department || undefined,
					},
					page       : search ? INITIAL_PAGE : page,
					page_limit : pageLimit,
				},
			});
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		}
	}, [activeTab, search, trigger, page, filters, pageLimit]);
	const { list } = data || {};

	const handleAllSelect = (e) => {
		const { checked } = e.target;
		if (checked) {
			const ids = list.map((val) => val.id);
			return setSelectedIds(ids);
		}

		return setSelectedIds([]);
	};

	const handleSelectId = (e, id) => {
		const { checked } = e.target;
		if (checked) { return setSelectedIds((prev) => ([...prev, id])); }
		const filterArr = selectedIds.filter((val) => val !== id);
		return setSelectedIds(filterArr);
	};

	useEffect(() => {
		fetch();
	}, [fetch, search]);

	const onClickNewJoinerColumn = (id) => {
		router.push('/new-employee-dashboard/[profile_id]', `/new-employee-dashboard/${id}`);
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
		handleAllSelect,
		handleSelectId,
		selectedIds,
		dataArr: list,
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
		pageLimit,
		setPageLimit,
		setSearch,
		search,
	};
};

export default useTableView;
