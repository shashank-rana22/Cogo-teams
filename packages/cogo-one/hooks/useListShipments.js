import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const DEFAULT_PAGE = 1;

const getParams = ({ pagination, serialId, shipmentType = '', filters = {} }) => {
	const { start_date = '', end_date = '' } = filters;
	return {
		filters: {
			state                   : ['shipment_received', 'confirmed_by_importer_exporter', 'in_progress'],
			serial_id               : serialId || undefined,
			shipment_type           : shipmentType || undefined,
			created_at_greater_than : start_date || undefined,
			created_at_less_than    : end_date || undefined,
		},
		get_shipment_quotation_data : true,
		milestone_data_required     : true,
		page                        : pagination,
		page_limit                  : 6,
	};
};

function useListShipments({ filters = {} }) {
	const [params, setParams] = useState({
		query        : '',
		pagination   : DEFAULT_PAGE,
		shipmentType : '',
	});

	const { query: searchQuery, debounceQuery } = useDebounceQuery();

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_shipments',
		method : 'get',
	}, { manual: true });

	const getShipmentsList = useCallback(
		async ({ pagination, serialId, shipmentType }) => {
			try {
				await trigger({
					params: getParams({ pagination, serialId, shipmentType, filters }),
				});
				setParams((prev) => ({ ...prev, pagination }));
			} catch (e) {
				console.error('e:', e);
			}
		},
		[filters, trigger],
	);

	const handlePageChange = (val) => {
		getShipmentsList({
			pagination   : val,
			serialId     : searchQuery,
			shipmentType : params?.shipmentType,
		});
	};

	useEffect(() => {
		getShipmentsList({
			pagination   : DEFAULT_PAGE,
			serialId     : searchQuery,
			shipmentType : params?.shipmentType,
		});
	}, [getShipmentsList, params?.shipmentType, searchQuery]);

	useEffect(() => {
		debounceQuery(params?.query || '');
	}, [debounceQuery, params?.query]);

	return {
		listLoading   : loading,
		shipmentsData : data,
		getShipmentsList,
		params,
		setParams,
		handlePageChange,
	};
}

export default useListShipments;
