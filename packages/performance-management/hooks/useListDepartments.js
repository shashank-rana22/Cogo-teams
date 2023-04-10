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
		try {
			trigger();
		} catch (e) {
			Toast.error(e.response?.data.error?.toString());
		}
	}, [trigger]);

	return { data, loading, getListDepartments };
};

export default useListDepartments;
