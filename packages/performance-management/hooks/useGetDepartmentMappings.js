import { useIrisRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useGetDepartmentMappings = ({ department, searchValue = '' }) => {
	const [params, setParams] = useState({
		Department   : department || undefined,
		Qdesignation : searchValue || undefined,
		PageLimit    : 1000,
	});

	const [{ data = {}, loading = false }] = useIrisRequest({
		url    : 'get_iris_get_department_mappings',
		method : 'get',
		params,
	}, { manual: false });

	useEffect(() => setParams((pv) => ({ ...pv, Qdesignation: searchValue || undefined })), [searchValue]);

	return { data, loading };
};

export default useGetDepartmentMappings;
