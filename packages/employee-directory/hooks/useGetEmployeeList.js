import { useDebounceQuery } from '@cogoport/forms';
import { useHarbourRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect, useCallback } from 'react';

const DEFAULT_PAGE_NO = 1;
const DEFAULT_PAGE_LIMIT = 10;

const getEmployeeStatus = (employeeFilters, rest) => {
	const { status } = employeeFilters;
	const { employee_status = [] } = rest || {};

	if (isEmpty(employeeFilters) && employee_status !== 'notice') {
		return employee_status;
	}

	if (!isEmpty(employeeFilters) && status) {
		const filterArr = status.filter((val) => val !== 'notice');
		return filterArr;
	}

	return undefined;
};

const getResignStatus = (employeeFilters, rest) => {
	const { status = [] } = employeeFilters;
	const { employee_status = [] } = rest || {};

	if ((isEmpty(employeeFilters) && employee_status === 'notice')
	|| (!isEmpty(employeeFilters) && status && status.includes('notice'))) {
		return true;
	}

	return undefined;
};

const useGetEmployeeList = () => {
	const [data, setData] = useState({});
	const [filters, setFilters] = useState({
		employee_status : 'confirmed',
		page            : DEFAULT_PAGE_NO,
		page_limit      : DEFAULT_PAGE_LIMIT,
	});
	const [employeeFilters, setemployeeFilters] = useState({});

	const [{ loading }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/list_employee_details',
	}, { manual: true });

	const { query = '', debounceQuery } = useDebounceQuery();

	const getEmployeeList = useCallback(
		async (download_as_csv) => {
			try {
				const { sort_by, sort_type, page, page_limit, ...rest } = filters || {};
				const { status, ...restData } = employeeFilters || {};
				const res = await trigger({
					params: {
						filters: {
							...rest,
							employee_status : getEmployeeStatus(employeeFilters, rest),
							q               : query === '' ? undefined : query,
							is_resigned     : getResignStatus(employeeFilters, rest),
							...restData,
						},
						sort_by,
						sort_type,
						page,
						page_limit,
						mappings_data_required : true,
						download_as_csv        : download_as_csv || undefined,
					},
				});

				if (!download_as_csv) {
					setData(res.data);
				}

				return res;
			} catch (error) {
				console.log('err', error);
			}
			return false;
		},
		[filters, trigger, query, employeeFilters],
	);

	useEffect(() => {
		setFilters((prev) => ({
			...prev,
			page: 1,
		}));
	}, [query, setFilters]);

	useEffect(() => {
		getEmployeeList();
	}, [getEmployeeList]);

	return {
		setFilters,
		filters,
		debounceQuery,
		data,
		loading,
		setemployeeFilters,
		employeeFilters,
		refetch: getEmployeeList,
		getEmployeeList,
	};
};

export default useGetEmployeeList;
