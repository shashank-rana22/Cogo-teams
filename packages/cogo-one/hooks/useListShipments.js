import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

import getFormatedPath from '../utils/getFormatedPath';

const DEFAULT_PAGE = 1;
const FILTERS_STATES = ['shipment_received', 'confirmed_by_importer_exporter', 'in_progress'];

const getParams = ({ pagination, serialId, shipmentType = '', dateFilters = {} }) => {
	const { start_date = '', end_date = '' } = dateFilters;

	return {
		filters: {
			state                   : FILTERS_STATES,
			serial_id               : serialId || undefined,
			shipment_type           : shipmentType || undefined,
			created_at_greater_than : !serialId ? start_date : undefined,
			created_at_less_than    : !serialId ? end_date : undefined,
		},
		get_shipment_quotation_data  : true,
		milestone_data_required      : true,
		current_task_status_required : true,
		last_completed_task_required : true,
		page                         : pagination,
		page_limit                   : 6,
	};
};

function useListShipments({ dateFilters = {} }) {
	const { queryParams = {} } = getFormatedPath();

	const [params, setParams] = useState({
		query        : queryParams.sid || '',
		pagination   : DEFAULT_PAGE,
		shipmentType : queryParams.shipmentType || '',
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
					params: getParams({
						pagination,
						serialId,
						shipmentType,
						dateFilters,
					}),
				});
				setParams((prev) => ({ ...prev, pagination }));
			} catch (e) {
				console.error('e:', e);
			}
		},
		[dateFilters, trigger],
	);

	const handlePageChange = (val) => {
		getShipmentsList({
			pagination   : val || params?.pagination,
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
