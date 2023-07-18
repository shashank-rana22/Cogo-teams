import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const ZERO = 0;
const useGetVesselScheduleById = ({ vesselId }) => {
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
				filters: {
					id: vesselId,
				},
				page_limit               : 10,
				page                     : 1,
				pagination_data_required : true,
				sort_by                  : 'updated_at',
				sort_type                : 'desc',
			};
			await trigger({
				params: payload,
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (vesselId) makeRequest();
	}, [vesselId]);
	return {
		data    : data?.list?.[ZERO],
		loading,
		refetch : makeRequest,
	};
};
export default useGetVesselScheduleById;
