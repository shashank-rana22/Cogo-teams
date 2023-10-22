import { useHarbourRequest } from '@cogoport/request';

const useGetEmployeeList = () => {
	const [{ data : respData, loading }, trigger] = useHarbourRequest({
		url    : 'list_employee_details',
		method : 'get',
	}, { manual: true });

	const getEmployeeList = async (query, callback) => {
		if (!query) return;

		try {
			const resData = await trigger({
				params: {
					filters: {
						q      : query,
						status : 'active',
						source : 'bypass',
					},
				},
			});
			const { data } = resData || {};
			const finalData = data?.list?.map((user) => ({ display: user.name, id: user.id }));
			callback(finalData);
		} catch (error) {
			console.log('err', error);
		}
	};

	return { getEmployeeList, respData, loading };
};

export default useGetEmployeeList;
