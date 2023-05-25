import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

import dummyData from '../DummyData/shipment_data.json';

export default function useGetShipment({ defaultParams = {}, defaultFilters = {}, initialCall = true }) {
	const [{ loading: isGettingShipment, data }, trigger] = useRequest({
		url    : '/get_shipment',
		method : 'GET',
		params : {
			filters: {
				...defaultFilters,
			},
			...defaultParams,
		},
	}, { manual: true });

	const getShipment = useCallback(async () => {
		await trigger();
	}, [trigger]);

	useEffect(() => {
		if (initialCall) getShipment();
	}, [getShipment, initialCall]);

	return {
		isGettingShipment,
		refetch               : getShipment,
		documents             : dummyData?.documents,
		primary_service       : dummyData?.primary_service_detail,
		shipment_data         : dummyData?.summary,
		document_delay_status : dummyData?.document_delay_status,
		booking_note_details  : dummyData?.booking_note_details,
		data,
	};
}
