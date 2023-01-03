import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState, useEffect, useRef } from 'react';

const useListShipments = () => {
	const firstRender = useRef(true);
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

	const [, trigger] = useRequest('/list_shipments', { manual: true });

	const refetch = async () => {
		setLoading(true);
		const { shipment_type, state } = restFilters || {};
		try {
			const res = await trigger({
				params: {
					filters: {
						shipment_type,
						state,
						...restFilters,
					},
					page,
					page_limit: 10,
				},
			});

			if (res?.status === 200) {
				setLoading(false);

				const { data = { list: [], total: 0 } } = res;

				setList(() => ({
					data         : data?.list || [],
					total        : data?.total_count,
					total_page   : data?.total,
					fullResponse : res.data,
					reverted     : data?.stats?.reverted,
				}));
			}
		} catch (err) {
			setLoading(false);
			if (err?.message === 'canceled') { return; }
			setList(() => ({
				data         : [],
				total        : 0,
				total_page   : 0,
				fullResponse : {},
				reverted     : 0,
			}));
			Toast.error('Something went wrong!');
		}
	};

	useEffect(() => {
		if (firstRender.current) {
			firstRender.current = false;
			return;
		}
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
