import { useRequest } from '@cogoport/request';

const useListDepartments = () => {
	const [{ data = {}, loading = false }] = useRequest({
		url    : 'list-departments',
		method : 'get',
	}, { manual: true });
	

	return { data, loading };
};

export default useListDepartments;
