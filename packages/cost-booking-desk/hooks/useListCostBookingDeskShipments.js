import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

function useListCostBookingDeskShipments() {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'fcl_freight/list_cost_booking_desk_shipments',
		method : 'GET',
		params : {
			filters: {
				trade_type     : 'export',
				is_job_closed  : 'false',
				new_collection : 'true',
			},
			page      : 1,
			sort_by   : 'created_at',
			sort_type : 'desc',
		},
	}, { manual: true });

	const listDocuments = useCallback(() => {
		(async () => {
			try {
				await trigger();
			} catch (err) {
				Toast(err);
			}
		})();
	}, [trigger]);

	useEffect(() => {
		listDocuments();
	}, [listDocuments]);

	return {
		loading,
		refetch : listDocuments,
		data    : data || [],
	};
}
export default useListCostBookingDeskShipments;
