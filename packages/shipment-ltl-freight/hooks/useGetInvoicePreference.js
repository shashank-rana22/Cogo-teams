import { useRequest } from '@cogoport/request';
import toastApiError from '@cogoport/surface-modules/utils/toastApiError';
import { useEffect, useCallback } from 'react';

function useGetInvoicePreference({
	filters = {},
	defaultFilters = {},
	defaultParams = {},
}) {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_shipment_invoice_preference',
		method : 'GET',
		params : {
			filters: {
				...defaultFilters,
				...filters,
			},
			...defaultParams,
		},
	}, { manual: true });

	const getPreference = useCallback(() => {
		(async () => {
			try {
				await trigger();
			} catch (err) {
				toastApiError(err);
			}
		})();
	}, [trigger]);

	useEffect(() => {
		getPreference();
	}, [getPreference]);

	return {
		loading,
		refetch: getPreference,
		data,
	};
}

export default useGetInvoicePreference;
