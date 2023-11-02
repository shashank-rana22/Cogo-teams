import toastApiError from '@cogoport/ocean-modules/utils/toastApiError';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const useListShipmentDocuments = ({ shipmentId }) => {
	const [filters, setFilters] = useState({});

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
	}, [apiTrigger, filters]);

	return {
		loading,
		data,
		apiTrigger,
		filters,
		setFilters,
	};
};

export default useListShipmentDocuments;
