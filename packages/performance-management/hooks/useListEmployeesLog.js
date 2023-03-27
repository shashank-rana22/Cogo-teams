import { useIrisRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useListEmployeesLog = () => {
	const [params, setParams] = useState({ page: 1, pageLimit: 10 });

	const [{ data: employeeData = {}, loading = false }] = useIrisRequest({
		url    : 'get_iris_list_logs',
		method : 'get',
		params,
	}, { manual: false });

	const setPage = (p) => setParams({ ...params, page: p });

	// useEffect(() => setParams({
	// 	Q: searchValue || undefined, Page: 1,
	// }), [searchValue]);

	return {
		employeeData,
		loading,
		params,
		setParams,
		setPage,
	};
};

export default useListEmployeesLog;
