import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetSailingSchedule = ({ id }) => {
	const [{ data, loading }, trigger] = useRequest(
		{
			url    : '/list_sailing_schedules',
			method : 'GET',
		},
		{ manual: true },
	);

	const getSailingSchedule = async () => {
		try {
			const payload = {
				filters: {
					id,
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
		} catch (err) {}
	};

	useEffect(() => {
		if (id) getSailingSchedule();
	}, [id]);
	return {
		data: data?.list?.[0],
		loading,
	};
};
export default useGetSailingSchedule;
