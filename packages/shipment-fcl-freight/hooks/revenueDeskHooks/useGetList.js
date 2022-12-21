import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useListShipments = (allParams) => {
	const { shipment_type = 'fcl_freight', ...params } = allParams || {};

	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(true);

	const [filters, setFilters] = useState({ page: 1, highlight: undefined, ...params });
	const [list, setList] = useState({
		data         : [],
		total        : 0,
		total_page   : 0,
		fullResponse : {},
		reverted     : 0,
	});

	const { page, highlight = false, ...restFilters } = filters;

	const [{ data:listShipmentData }, trigger] = useRequest('/list_shipments', { manual: true });

	const service = `${shipment_type}_service`;

	const listAPi = (restFilters, currentPage) => trigger({
		params: {
			filters:
					allParams.status === 'completed'
						? {
							state: 'completed',
							// state: [
							// 	'completed',
							// 	'in_progress',
							// 	'confirmed_by_importer_exporter',
							// ],
							shipment_type: [
								'fcl_freight',
							].includes(shipment_type)
								? shipment_type
								: undefined,
							// [service]: {
							// 	state: [
							// 		'awaiting_service_provider_confirmation',
							// 		'confirmed_by_service_provider',
							// 	],
							// },
							// booking_confirmation_preferences_set: true,
							...restFilters,
						  }
						: {
							state         : 'in_progress',
							shipment_type : 'fcl_freight',
							// state: ['confirmed_by_importer_exporter', 'in_progress'],
							shipment_type : ([
								'fcl_freight',
								'lcl_freight',
								'air_freight',
							].includes(shipment_type))
								? shipment_type
								: undefined,
							// [service]: {
							// 	state: 'awaiting_service_provider_confirmation',
							// },
							booking_confirmation_preferences_not_set: true,
							...restFilters,
						  },
			main_service_quotation_required : true,
			revenue_desk_data_required      : true,
			page_limit                      : 10,
			page                            : currentPage,
		},
	});

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
	}, [filters, JSON.stringify(params)]);

	const hookSetters = {
		setLoading,
		setFilters,
		setErrors,
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