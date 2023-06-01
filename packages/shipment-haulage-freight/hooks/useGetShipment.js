import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { useCallback, useEffect } from 'react';

import dummyData from '../dummyData/get_shipment.json';

export default function useGetShipment({ defaultParams = {}, defaultFilters = {}, initialCall = true }) {
	const [{ loading: isGettingShipment, data }, trigger] = useRequest({
		url          : '/get_shipment',
		method       : 'GET',
		service_name : 'shipment',
		params       : {
			filters: {
				...defaultFilters,
			},
			...defaultParams,
		},
	}, { manual: true });

	const getShipment = useCallback(async () => {
		try {
			await trigger();
		} catch (err) {
			toastApiError(err);
		}
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
