import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const useGetSailingSchedules = ({
	shipping_line_id = '',
	destination_port_id = '',
	origin_port_id = '',
}) => {
	const [sailingSchedules, setSailingSchedules] = useState([]);

	const [{ loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/get_sailing_schedules',
	}, { manual: true });

	const getSailingSchedules = useCallback(async () => {
		try {
			const { data = {} } = await trigger({
				params: {
					destination_port_id,
					origin_port_id,
					filters    : { shipping_line_id },
					page_limit : 1000,
					sort_by    : 'departure',
					sort_type  : 'asc',
				},
			});

			const { list = [] } = data;

			setSailingSchedules(list);
		} catch (err) {
			setSailingSchedules([]);
			Toast.error(getApiErrorString(err.response?.data));
		}
	}, [destination_port_id, origin_port_id, shipping_line_id, trigger]);

	useEffect(() => {
		setSailingSchedules([]);
		if (shipping_line_id) {
			getSailingSchedules();
		}
	}, [getSailingSchedules, shipping_line_id]);

	return {
		sailingSchedules,
		loading,
	};
};

export default useGetSailingSchedules;
