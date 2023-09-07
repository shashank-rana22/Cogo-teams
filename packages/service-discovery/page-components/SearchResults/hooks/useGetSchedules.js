import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useMemo } from 'react';

const SHIPPING_LINE_MAPPING = {
	fcl_freight : 'shipping_line_id',
	air_freight : 'airline_id',
};

const useGetSchedules = (service) => {
	const { spot_search_id = '' } = useSelector(({ general }) => general.query);

	const [{ loading, data }] = useRequest({
		method : 'GET',
		url    : '/get_spot_search_schedules',
		params : { spot_search_id },
	}, { manual: false });

	const scheduleObject = useMemo(() => {
		const key = SHIPPING_LINE_MAPPING[service || 'fcl_freight'];

		const OBJECT = {};

		const { list = [] } = data || {};

		(list || []).forEach((item) => {
			OBJECT[item?.[key || 'shipping_line_id']] = item;
		});

		return OBJECT;
	}, [data, service]);

	return { loading, scheduleObject };
};

export default useGetSchedules;
