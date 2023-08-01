import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const DEFAULT_PAGE = 1;

const getParams = ({ pagination, serialId }) => ({
	filters: {
		state     : ['shipment_received', 'confirmed_by_importer_exporter', 'in_progress'],
		serial_id : serialId || undefined,
	},
	get_shipment_quotation_data : true,
	milestone_data_required     : true,
	page                        : pagination,
	page_limit                  : 6,
});

function useListShipments() {
	const [params, setParams] = useState({
		query      : '',
		pagination : DEFAULT_PAGE,
	});

	const { query: searchQuery, debounceQuery } = useDebounceQuery();

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_shipments',
		method : 'get',
	}, { manual: true });

	const getShipmentsList = useCallback(
		async ({ pagination, serialId }) => {
			try {
				await trigger({
					params: getParams({ pagination, serialId }),
				});
				setParams((prev) => ({ ...prev, pagination }));
			} catch (e) {
				console.error('e:', e);
			}
		},
		[trigger],
	);

	const handlePageChange = (val) => {
		getShipmentsList({
			pagination : val,
			serialId   : searchQuery,
		});
	};

	useEffect(() => {
		getShipmentsList({
			pagination : DEFAULT_PAGE,
			serialId   : searchQuery,
		});
	}, [getShipmentsList, searchQuery]);

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
