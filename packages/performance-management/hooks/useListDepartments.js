import { Toast } from '@cogoport/components';
import { useIrisRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useListDepartments = () => {
	const [{ data = {}, loading = false }, trigger] = useIrisRequest({
		url    : 'get_iris_list_departments',
		method : 'get',
	}, { manual: true });

	const getListDepartments = () => {
		try {
			trigger();
		} catch (e) {
			Toast.error(e.response?.data.error?.toString());
		}
	};

	useEffect(() => {
		getListDepartments();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { data, loading, getListDepartments };
};

export default useListDepartments;
