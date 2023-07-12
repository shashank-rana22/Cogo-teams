import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useListSailingSchedules = ({ filters }) => {
	const [{ data, loading }, trigger] = useRequest(
		{
			url    : '/list_sailing_schedules',
			method : 'GET',
		},
		{ manual: true },
	);
	const { page, departure_date = undefined, ...restFilters } = filters;

	const listSailingSchedules = async () => {
		try {
			const payload = {
				filters                  : restFilters,
				sailing_route_required   : true,
				page_limit               : 10,
				page,
				departure_start          : departure_date,
				pagination_data_required : true,
				sort_by                  : 'updated_at',
				sort_type                : 'desc',
			};
			await trigger({
				params: payload,
			});
		} catch (err) {}
	};

	useEffect(() => {
		listSailingSchedules();
	}, [JSON.stringify(filters)]);

	return {
		data       : data?.list,
		loading,
		totalItems : data?.total_count,
		listSailingSchedules,
	};
};
export default useListSailingSchedules;
