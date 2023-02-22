import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useGetCogoverseDashboard = ({ country = {}, date = {} }) => {
	const [list, setList] = useState({
		fullResponse: {},
	});

	const [{ error, loading }, trigger, refetch] = useRequest({
		url    : '/get_cogoverse_dashboard',
		method : 'GET',
		params : {
			mobile_country_code : country?.mobile_country_code || undefined,
			start_date          : date?.startDate || undefined,
			end_date            : date?.endDate || undefined,

		},
	}, { manual: true });

	useEffect(() => {
		trigger()
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
	}, [date]);

	return {
		statsLoading: loading,
		list,
		error,
		refetch,
	};
};

export default useGetCogoverseDashboard;
