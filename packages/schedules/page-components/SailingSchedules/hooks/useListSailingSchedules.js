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
	const {
		page, departure_date = '',
		origin_port_id = '',
		destination_port_id = '',
		shipping_line_id = '',
		sort_by = '',
	} = filters;

	const listSailingSchedules = async () => {
		try {
			const payload = {
				filters: {
					origin_port_id      : origin_port_id || undefined,
					destination_port_id : destination_port_id || undefined,
					shipping_line_id    : shipping_line_id || undefined,
				},
				sailing_route_required   : true,
				page_limit               : 10,
				page,
				departure_start          : departure_date || undefined,
				pagination_data_required : true,
				sort_by                  : sort_by || undefined,
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
