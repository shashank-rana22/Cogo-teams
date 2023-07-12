import { useRequest } from '@cogoport/request';
import { useState, useCallback, useEffect } from 'react';

import ToastApiError from '../common/ToastApiError';

const DEFAULT_PAGE = 1;
const MAX_ITEMS_PER_PAGE = 10;

function useListShipmentInvoicePreferences() {
	const [filters, setFilters] = useState({});

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_shipment_invoice_preference',
		method : 'GET',
	}, { manual: true });

	const getInvoices = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: {
						shipment_type: 'ftl_freight',
						...filters,
					},
					page       : filters?.page || DEFAULT_PAGE,
					page_limit : MAX_ITEMS_PER_PAGE,
				},
			});
		} catch (err) {
			ToastApiError(err);
		}
	}, [trigger, filters]);

	useEffect(() => {
		getInvoices();
	}, [getInvoices]);

	return {
		data,
		loading,
		filters,
		setFilters,
		getInvoices,
	};
}

export default useListShipmentInvoicePreferences;
