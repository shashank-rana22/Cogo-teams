import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetVesselSchedules = ({ filter }) => {
	const [{ data, loading }, trigger] = useRequest(
		{
			url    : '/list_vessel_schedules',
			method : 'GET',
		},
		{ manual: true },
	);

	const makeRequest = async () => {
		try {
			const payload = {
				filter,
				page_limit               : 10,
				page                     : 1,
				pagination_data_required : true,
				sort_by                  : 'updated_at',
				sort_type                : 'desc',
			};
			await trigger({
				data: payload,
			});
		} catch (err) {}
	};

	useEffect(() => {
		makeRequest();
	}, []);
	return {
		data: data?.list,
		loading,
		makeRequest,
	};
};
export default useGetVesselSchedules;
