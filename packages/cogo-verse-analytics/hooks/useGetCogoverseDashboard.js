import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetCogoverseDashboard = ({ country = {} }) => {
	const [list, setList] = useState({
		fullResponse: {},
	});

	const [{ error, loading }, refetch] = useRequest({
		url    : '/get_cogoverse_dashboard',
		method : 'GET',
		params : {

		},
	}, { manual: true });

	useEffect(() => {
		refetch()
			.then((res) => {
				setList(() => ({
					fullResponse: res.data,
				}));
			})
			.catch(() => {
				setList(() => ({

					fullResponse : {},
					reverted     : 0,
				}));
			});
		// eslint-disable-next-line
	}, []);

	return {
		loading,
		list,
		error,
		refetch,
	};
};

export default useGetCogoverseDashboard;
