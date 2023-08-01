import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const ZERO = 0;
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
				sailing_route_required   : true,
				page_limit               : 10,
				page                     : 1,
				pagination_data_required : true,
				sort_by                  : 'updated_at',
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
		if (id) getSailingSchedule();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);
	return {
		data: data?.list?.[ZERO],
		loading,
	};
};
export default useGetSailingSchedule;
