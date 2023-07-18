import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useListServiceLanes = ({ filters }) => {
	const [{ data, loading }, trigger] = useRequest(
		{
			url    : '/list_service_lanes',
			method : 'GET',
		},
		{ manual: true },
	);

	const { page = 1, sort_by, q, origin_port_id, destination_port_id, ...restFilters } = filters;
	const listServiceLanes = async () => {
		try {
			const payload = {
				filters: {
					q                   : q || undefined,
					origin_port_id      : origin_port_id || undefined,
					destination_port_id : destination_port_id || undefined,
					...restFilters,
				},
				page_limit               : 10,
				page,
				pagination_data_required : true,
				sort_by                  : sort_by || undefined,
				sort_type                : 'desc',
			};
			await trigger({
				params: payload,
			});
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		listServiceLanes();
	}, [JSON.stringify(filters)]);

	return {
		data        : data?.list,
		loading,
		totalItems  : data?.total_count,
		currentPage : page,
		listServiceLanes,
	};
};

export default useListServiceLanes;
