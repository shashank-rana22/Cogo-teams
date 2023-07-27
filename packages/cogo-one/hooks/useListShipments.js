import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

const FIRST_PAGE = 1;

const getParams = ({ pagination }) => ({
	filters: {
		state: ['shipment_received', 'confirmed_by_importer_exporter', 'in_progress'],
	},
	get_shipment_quotation_data : true,
	// milestone_data_required     : true,
	page                        : pagination,
	page_limit                  : 6,
});

function useListShipments() {
	const [pagination, setPagination] = useState(FIRST_PAGE);

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_shipments',
		method : 'get',
	}, { manual: true });

	const getShipmentsList = useCallback(
		async () => {
			try {
				await trigger({
					params: getParams({ pagination }),
				});
			} catch (e) {
				console.error('e:', e);
			}
		},
		[pagination, trigger],
	);

	useEffect(() => {
		getShipmentsList();
	}, [getShipmentsList]);

	return {
		listLoading   : loading,
		shipmentsData : data,
		getShipmentsList,
		setPagination,
	};
}

export default useListShipments;
