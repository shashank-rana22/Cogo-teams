import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useListRevenueDeskDecisions = ({ shipmentId = '' }) => {
	const [{ data, loading }, trigger] = useRequest({
		method : 'GET',
		url    : '/list_revenue_desk_decisions',
	}, { manual: true });

	const fetchRevenueDeskDecisions = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: {
						shipment_id: shipmentId,
					},
				},
			});
		} catch (err) {
			// console.log(err);
		}
	}, [trigger, shipmentId]);
	useEffect(() => {
		fetchRevenueDeskDecisions();
	}, [fetchRevenueDeskDecisions]);
	return {
		data,
		loading,
	};
};
export default useListRevenueDeskDecisions;
