import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
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

	const { page = 1, sort_by, q, origin_port_id, destination_port_id, shipping_line_id, id } = filters;
	const listServiceLanes = async () => {
		try {
			const payload = {
				filters: {
					q                   : q || undefined,
					origin_port_id      : origin_port_id || undefined,
					destination_port_id : destination_port_id || undefined,
					shipping_line_id    : shipping_line_id || undefined,
					id                  : id || undefined,
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
		} catch (e) {
			if (e.response?.data) { Toast.error(getApiErrorString(e.response?.data)); }
		}
	};

	useEffect(() => {
		listServiceLanes();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(filters)]);

	return {
		data        : data?.list,
		loading,
		totalItems  : data?.total_count,
		currentPage : page,
		refetch     : listServiceLanes,
	};
};

export default useListServiceLanes;
