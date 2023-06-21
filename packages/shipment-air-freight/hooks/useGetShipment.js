import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

export default function useGetShipment({ defaultParams = {}, defaultFilters = {}, initialCall = true }) {
	const [getShipmentStatusCode, setGetShipmentStatusCode] = useState();
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
			const res = await trigger();
			setGetShipmentStatusCode(res?.status);
		} catch (err) {
			toastApiError(err);
			setGetShipmentStatusCode(err?.response?.data?.status_code || err?.response?.status);
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
		getShipmentStatusCode,
	};
}
