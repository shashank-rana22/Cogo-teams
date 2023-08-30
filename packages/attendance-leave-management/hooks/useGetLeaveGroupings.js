import { useHarbourRequest } from '@cogoport/request';

const useGetLeaveGroupings = (type) => {
	const [{ loading, data }] = useHarbourRequest({
		method : 'GET',
		url    : '/get_employee_groupings',
		params : {
			request_type: type === 'employee' ? 'employee' : undefined,
		},
	}, { manual: false });

	return { loading, data };
};

export default useGetLeaveGroupings;
