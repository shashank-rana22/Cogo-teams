import { useIrisRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useListEmployees = ({ searchValue = '' }) => {
	const [params, setParams] = useState({ Page: 1, PageLimit: 10 });

	const [{ data: employeeData = {}, loading = false }] = useIrisRequest({
		url    : 'get_iris_list_employees',
		method : 'get',
		params,
	}, { manual: false });

	const setPage = (p) => setParams({ ...params, Page: p });

	useEffect(() => setParams({ Q: searchValue || undefined, Page: 1 }), [searchValue]);

	return { employeeData, loading, params, setParams, setPage };
};

export default useListEmployees;
