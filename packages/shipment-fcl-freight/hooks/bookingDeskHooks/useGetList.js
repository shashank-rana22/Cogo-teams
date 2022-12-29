import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useListShipments = () => {
	const [loading, setLoading] = useState(true);

	const [filters, setFilters] = useState({ page: 1, highlight: undefined });
	const [list, setList] = useState({
		data         : [],
		total        : 0,
		total_page   : 0,
		fullResponse : {},
		reverted     : 0,
	});

	const { page, ...restFilters } = filters;

	const [{ data }, trigger] = useRequest('/list_shipments', { manual: true });

	const shipment_state = [
		'shipment_received',
		'confirmed_by_importer_exporter',
		'in_progress',
	];

	const listAPi = (restFilters, currentPage) => {
		const shipment_type = restFilters || {};

		const listfilters = {
			shipment_type,
			state: shipment_state,
			...restFilters,
		};

		return trigger({ params: { listfilters, ...{ page: currentPage } } });
	};

	const refetch = () => {
		setLoading(true);

		listAPi(restFilters, page)
			.then((res) => {
				const { data = { list: [], total: 0 } } = res;
				setList(() => ({
					data         : data?.list || [],
					total        : data?.total_count,
					total_page   : data?.total,
					fullResponse : res.data,
					reverted     : data?.stats?.reverted,
				}));
				setLoading(false);
			})
			.catch((e) => {
				console.log(e);
				setList(() => ({
					data         : [],
					total        : 0,
					total_page   : 0,
					fullResponse : {},
					reverted     : 0,
				}));
				setLoading(false);
			});
	};

	useEffect(() => {
		setLoading(true);
		refetch();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters]);

	const hookSetters = {
		setLoading,
		setFilters,
		setList,
	};

	return {
		loading,
		page,
		filters,
		list,
		hookSetters,
		refetch,
	};
};

export default useListShipments;
