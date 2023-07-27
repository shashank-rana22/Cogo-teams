import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const getParams = () => ({
	filters: {
		state: ['shipment_received', 'confirmed_by_importer_exporter', 'in_progress'],
	},
	get_shipment_quotation_data : true,
	// milestone_data_required     : true,
	page                        : 1,
	page_limit                  : 6,
});

function useListShipments() {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_shipments',
		method : 'get',
	}, { manual: true });

	const getShipmentsList = useCallback(
		async () => {
			try {
				await trigger({
					params: getParams(),
				});
			} catch (e) {
				console.error('e:', e);
			}
		},
		[trigger],
	);

	useEffect(() => {
		getShipmentsList();
	}, [getShipmentsList]);

	return {
		listLoading   : loading,
		shipmentsData : data,
		getShipmentsList,
	};
}

export default useListShipments;
