import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

const useListSailingSchedulePortPairs = ({ filters, currentPage }) => {
	const { scope } = useSelector(({ general }) => ({ scope: general.scope }));
	const [{ data }, trigger] = useRequest({
		method : 'get',
		url    : '/list_sailing_schedule_port_pairs',
		scope,
	}, { manual: true });

	const getListSailingSchedulePortPairData = () => trigger({
		params: {
			filters: (filters?.origin_port && filters?.destination_port) ? {
				origin_port_id      : [filters.origin_port],
				destination_port_id : [filters.destination_port],
			} : null,
			page: currentPage,
		},
	});

	useEffect(() => {
		getListSailingSchedulePortPairData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(filters), currentPage]);

	return {
		data       : data?.list,
		getListSailingSchedulePortPairData,
		totalCount : data?.total_count,
	};
};

export default useListSailingSchedulePortPairs;
