import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback, useState } from 'react';

function useListCostBookingDeskShipments() {
	const { authParams, selected_agent_id } = useSelector(({ profile }) => profile) || {};
	const [apiData, setApiData] = useState('');

	const [{ loading }, trigger] = useRequest({
		url    : 'fcl_freight/list_cost_booking_desk_shipments',
		method : 'GET',
		params : {
			additional_methods: ['pagination'],
		},
	}, { manual: true });

	const apiTrigger = useCallback(async () => {
		try {
			const res = await trigger();
			setApiData(res?.data);
		} catch (err) {
			Toast(err);
		}
	}, [trigger]);

	useEffect(() => {
		const [, scope, view_type] = (authParams || '').split(':');
		if (!scope) { return; }

		apiTrigger();
	}, [apiTrigger, authParams]);

	return {
		loading,
		apiTrigger,
		data: apiData,
	};
}
export default useListCostBookingDeskShipments;
