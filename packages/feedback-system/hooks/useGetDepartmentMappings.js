import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useGetDepartmentMappings = ({ department, searchValue = '' }) => {
	const [params, setParams] = useState({
		Department   : department || undefined,
		Qdesignation : searchValue || undefined,
	});

	const [{ data = {}, loading = false }] = useRequest({
		url    : 'get_department_mappings',
		method : 'get',
		params,
	}, { manual: false });

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => setParams({ ...params, Qdesignation: searchValue || undefined }), [searchValue]);

	return { data, loading };
};

export default useGetDepartmentMappings;
