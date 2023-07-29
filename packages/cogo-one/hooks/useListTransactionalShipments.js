import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

const getParams = ({ pagination, orgId, filters }) => ({
	filters: {
		state                : ['shipment_received', 'confirmed_by_importer_exporter', 'in_progress'],
		serial_id            : filters || undefined,
		importer_exporter_id : orgId,
	},
	get_shipment_quotation_data : true,
	// milestone_data_required     : true,
	page                        : pagination,
	page_limit                  : 6,
});

function useListTransactionalShipments({ pagination = 1, orgId = '', filters }) {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_shipments',
		method : 'get',
	}, { manual: true });

	const getShipmentsList = useCallback(
		async () => {
			try {
				await trigger({
					params: getParams({ pagination, orgId, filters }),
				});
			} catch (error) {
				console.error('error', error);
			}
		},
		[filters, orgId, pagination, trigger],
	);

	useEffect(() => {
		getShipmentsList();
	}, [getShipmentsList]);

	return {
		listLoading   : loading,
		shipmentsData : data,
	};
}

export default useListTransactionalShipments;
