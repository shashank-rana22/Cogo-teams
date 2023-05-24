import { Toast } from '@cogoport/components';
import { useIrisRequest } from '@cogoport/request';

const useListDepartments = () => {
	const [{ data = {}, loading = false }, trigger] = useIrisRequest({
		url    : 'get_iris_list_departments',
		method : 'get',
	}, { manual: false });

	const getListDepartments = () => {
		try {
			trigger();
		} catch (e) {
			Toast.error(e.response?.data.error?.toString());
		}
	};

	return { data, loading, getListDepartments };
};

export default useListDepartments;
