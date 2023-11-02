import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useListShipmentDocuments = ({ shipmentId }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : 'list_shipment_documents',
		method : 'GET',
		params : {
			filters: {
				shipment_id   : shipmentId,
				document_type : 'booking_proof',
			},
		},
	}, { manual: true });

	const apiTrigger = useCallback(() => {
		(
			async () => {
				try {
					await trigger();
				} catch (err) {
					toastApiError(err);
				}
			}
		)();
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
