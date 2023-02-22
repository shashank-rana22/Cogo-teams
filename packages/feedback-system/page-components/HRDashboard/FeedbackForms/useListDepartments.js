import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useListDepartments = () => {
	const [{ data = {}, loading = false }, trigger] = useRequest({
		url    : 'list-departments',
		method : 'get',
	}, { manual: true });
	

	const getListDepartments = async () => {
		await trigger();
	};

	useEffect(() => getListDepartments, []);

	return { data, loading, getListDepartments };
};

export default useListDepartments;
