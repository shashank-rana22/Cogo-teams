import { useHarbourRequest } from '@cogoport/request';

const useGetEmployeeDetails = ({ activePage }) => {
	const [{ loading, data }] = useHarbourRequest(
		{
			method : 'GET',
			url    : '/get_employee_details',
			params : {
				id: activePage,
			},
		},
		{ manual: false },
	);
	return { data, loading };
};

export default useGetEmployeeDetails;
