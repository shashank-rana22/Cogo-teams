import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetVesselSchedules = ({ filters }) => {
	const [{ data, loading }, trigger] = useRequest(
		{
			url    : '/list_vessel_schedules',
			method : 'GET',
		},
		{ manual: true },
	);

	const {
		started_at = '',
		q = '',
		shipping_line_id = '',
		sort_by = '',
		page,
	}	 = filters;
	const makeRequest = async () => {
		try {
			const payload = {
				filters: {
					q                : q || undefined,
					started_at       : started_at || undefined,
					shipping_line_id : shipping_line_id || undefined,
					sort_by          : sort_by || undefined,
				},
				page_limit               : 10,
				page,
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
		makeRequest();
	}, [filters]);
	return {
		data       : data?.list,
		loading,
		totalItems : data?.total_count,
		makeRequest,
	};
};
export default useGetVesselSchedules;
