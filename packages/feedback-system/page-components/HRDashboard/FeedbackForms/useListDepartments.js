import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useListDepartments = () => {
	const [{ data = {}, loading = false }, trigger] = useRequest({
		url    : 'list_departments',
		method : 'get',
	}, { manual: true });

	const getListDepartments = async () => {
		await trigger();
	};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => getListDepartments, []);

	return { data, loading, getListDepartments };
};

export default useListDepartments;
