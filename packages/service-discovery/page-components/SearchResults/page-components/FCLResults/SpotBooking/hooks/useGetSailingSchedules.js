import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const useGetSailingSchedules = ({
	destination_port_id = '',
	origin_port_id = '',
	watch = () => {},
	isOriginIcd = false,
	isDestinationIcd = false,
	setValue = () => {},
}) => {
	const [sailingSchedules, setSailingSchedules] = useState([]);

	const {
		shipping_line_id = '',
		origin_main_port_id = '',
		destination_main_port_id = '',
	} = watch() || {};

	const [{ loading }, trigger] = useRequest(
		{
			method : 'GET',
			url    : '/get_sailing_schedules',
		},
		{ manual: true },
	);

	const getSailingSchedules = useCallback(async () => {
		try {
			const { data = {} } = await trigger({
				params: {
					destination_port_id : destination_main_port_id || destination_port_id,
					origin_port_id      : origin_main_port_id || origin_port_id,
					filters             : { shipping_line_id },
					page_limit          : 1000,
					sort_by             : 'departure',
					sort_type           : 'asc',
				},
			});

			const { list = [] } = data;

			setSailingSchedules(list);
		} catch (err) {
			setSailingSchedules([]);
			Toast.error('There is a issue while fetching schedules');
		}
	}, [destination_main_port_id, destination_port_id, origin_main_port_id, origin_port_id, shipping_line_id, trigger]);

	useEffect(() => {
		setSailingSchedules([]);
		setValue('suitable_schedule', '');

		if (
			!shipping_line_id
			|| (isOriginIcd && !origin_main_port_id)
			|| (isDestinationIcd && !destination_main_port_id)
		) {
			return;
		}

		getSailingSchedules();
	}, [
		getSailingSchedules,
		shipping_line_id,
		destination_main_port_id,
		origin_main_port_id,
		setValue,
		isOriginIcd,
		isDestinationIcd,
	]);

	return {
		sailingSchedules,
		loading,
	};
};

export default useGetSailingSchedules;
