import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
// import { useSelector } from '@cogoport/store';
import { useEffect, useCallback, useState, useMemo } from 'react';

import getPayload from '../helpers/getPayload';

function useListCostBookingDeskShipments({ prefix, stateProps }) {
	// const { authParams, selected_agent_id } = useSelector(({ profile }) => profile) || {};
	const [data, setData] = useState('');
	const { activeTab, filters } = stateProps;

	const payload = useMemo(() => getPayload({ filters, activeTab }), [filters, activeTab]);

	const [{ loading }, trigger] = useRequest({
		url    : `${prefix}/list_cost_booking_desk_shipments`,
		method : 'GET',
		params : payload,
	}, { manual: true });

	const listDocuments = useCallback(async () => {
		try {
			const res = await trigger();
			setData(res?.data);
		} catch (err) {
			Toast(err);
		}
	}, [trigger]);

	useEffect(() => {
		// const [, scope, view_type] = (authParams || '').split(':');
		// if (!scope || !activeTab) return;
		// const scopeFilters = { scope, view_type, selected_agent_id };
		listDocuments();
		localStorage.setItem('cost_booking_desk_stored_values', JSON.stringify({ filters, activeTab }));
	}, [listDocuments, activeTab, filters]);

	return {
		loading,
		refetch : listDocuments,
		data    : data || [],
	};
}
export default useListCostBookingDeskShipments;
