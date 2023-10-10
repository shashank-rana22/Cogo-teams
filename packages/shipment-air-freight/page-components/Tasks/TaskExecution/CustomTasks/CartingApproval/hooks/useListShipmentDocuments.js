import { toastApiError } from '@cogoport/air-modules';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useListShipmentDocuments = ({ shipmentData = {} }) => {
	const [{ loading, data = {} }, trigger] = useRequest({
		url    : '/list_shipment_documents',
		method : 'GET',
		params : {
			filters: {
				shipment_id   : shipmentData?.id,
				document_type : 'carting_order',
			},
		},
	}, { manual: false });

	const apiTrigger = useCallback(async () => {
		try {
			await trigger();
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);

	useEffect(() => {
		apiTrigger();
	}, [apiTrigger]);

	return {
		loading,
		data,
	};
};

export default useListShipmentDocuments;
