import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useListDepartments = () => {
	const [{ data = {}, loading = false }, trigger] = useRequest({
		url    : 'list_departments',
		method : 'get',
	}, { manual: true });

	const getListDepartments = () => {
		trigger();
	};

	useEffect(() => {
		getListDepartments();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { data, loading, getListDepartments };
};

export default useListDepartments;
