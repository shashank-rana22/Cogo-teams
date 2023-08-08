import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect, useMemo } from 'react';

const SHIPPING_LINE_MAPPING = {
	fcl_freight : 'shipping_line_id',
	air_freight : 'airline_id',
};

const useGetSchedules = (service) => {
	const { spot_search_id = '' } = useSelector(({ general }) => general.query);

	const [{ loading, data }, trigger] = useRequest({
		method : 'GET',
		url    : '/get_spot_search_schedules',
	}, { manual: true });

	const getSchedules = useCallback(async () => {
		await trigger({
			params: { spot_search_id },
		});
	}, [spot_search_id, trigger]);

	const scheduleObject = useMemo(() => {
		const key = SHIPPING_LINE_MAPPING[service || 'fcl_freight'];

		const OBJECT = {};

		const { list = [] } = data || {};

		(list || []).forEach((item) => {
			OBJECT[item?.[key || 'shipping_line_id']] = item;
		});

		return OBJECT;
	}, [data, service]);

	useEffect(() => {
		getSchedules();
	}, [getSchedules]);

	const refetch = () => {
		getSchedules();
	};

	return { refetch, loading, scheduleObject };
};

export default useGetSchedules;
