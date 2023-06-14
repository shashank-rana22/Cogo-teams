import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect } from 'react';

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

	const { documents, primary_service_detail, summary, document_delay_status, booking_note_details } = data || {};

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
		refetch         : getShipment,
		documents,
		primary_service : primary_service_detail,
		shipment_data   : summary,
		document_delay_status,
		booking_note_details,
		data,
	};
}
