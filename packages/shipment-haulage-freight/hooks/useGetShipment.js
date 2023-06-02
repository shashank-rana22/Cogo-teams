import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { useCallback, useEffect } from 'react';

// import dummyData from '../dummyData/get_shipment.json';

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
		documents             : data?.documents,
		primary_service       : data?.primary_service_detail,
		shipment_data         : data?.summary,
		document_delay_status : data?.document_delay_status,
		booking_note_details  : data?.booking_note_details,
		data,
	};
}
