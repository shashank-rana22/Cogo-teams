import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useListShipments = () => {
	

    const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(true);

	const [filters, setFilters] = useState({ page: 1, highlight: undefined });
	const [list, setList] = useState({
		data: [],
		total: 0,
		total_page: 0,
		fullResponse: {},
		reverted: 0,
	});

	const { page, highlight = false, ...restFilters } = filters;
    
    const [ {data:listShipmentData} , trigger]=useRequest('/list_shipments',{manual:true})

	const shipment_state = [
		'shipment_received',
		'confirmed_by_importer_exporter',
		'in_progress',
	];

	const listAPi = (restFilters, currentPage) => {
		console.log(currentPage,'pageee');
		const shipment_type = restFilters || {};

		const filters = {
			shipment_type ,
			state: shipment_state,
			...restFilters,
		};

		return trigger({ params: { filters, ...{ page: currentPage } } });
	};

    const refetch = () => {
		setLoading(true);
		
		listAPi(restFilters, page)
			.then((res) => {
				const { data = { list: [], total: 0 } } = res;
				setList(() => ({
					data: data?.list || [],
					total: data?.total_count,
					total_page: data?.total,
					fullResponse: res.data,
					reverted: data?.stats?.reverted,
				}));
				setLoading(false);
			})
			.catch((e) => {
				console.log(e);
				setList(() => ({
					data: [],
					total: 0,
					total_page: 0,
					fullResponse: {},
					reverted: 0,
				}));
				setLoading(false);
			});
	};

	useEffect(() => {

			setLoading(true);
			refetch();
		
	}, [filters]);

	const hookSetters = {
		setLoading,
		setFilters,
		setErrors,
		setList,
	};


	return {
		loading: loading ,
		page,
		filters,
		list,
		hookSetters,
		refetch,
	};
};

export default useListShipments;