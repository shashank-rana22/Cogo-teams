import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

import removeObjEmptyValue from '../helpers/removeObjEmptyValue';

const useListShipmentInvoiceCombinations = ({ defaultFilters = {} }) => {
	const [apiData, setApiData] = useState({});
	const [filters, setFilters] = useState({});

	const { page = 1, ...restFilters } = filters;

	const [{ loading }, trigger] = useRequest({
		url    : '/list_shipment_invoice_combinations',
		params : {
			filters: {
				...defaultFilters,
				...(removeObjEmptyValue(restFilters)),

			},
			page,
			page_limit : 10,
			sort_by    : 'created_at',
		},
	}, { manual: true });

	const apiTrigger = useCallback(async () => {
		try {
			const res = await trigger();

			setApiData(res?.data || {});
		} catch (err) {
			setApiData({});

			// toastApiError(err);
			console.error(err);
		}
	}, [trigger]);

	useEffect(() => {
		apiTrigger();
	}, [apiTrigger, filters]);

	return {
		loading,
		data    : apiData,
		refetch : apiTrigger,
		setFilters,
		filters,
	};
};

export default useListShipmentInvoiceCombinations;
