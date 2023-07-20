import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

const useListShipmentAudits = ({ defaultFilters = {} }) => {
	const [apiData, setApiData] = useState({});
	const [filters, setFilters] = useState({});

	const { page = 1, ...restFilters } = filters;

	const [{ loading }, trigger] = useRequest({
		url    : 'list_shipment_audits',
		params : {
			filters: {
				...defaultFilters,
				...restFilters,
			},
			page,
		},
	}, { manual: true });

	const apiTrigger = useCallback(async () => {
		try {
			const res = await trigger();

			setApiData(res.data || {});
		} catch (err) {
			setApiData({});

			// console.log(err);
		}
	}, [trigger]);

	useEffect(() => {
		apiTrigger();
	}, [apiTrigger, filters]);

	return {
		apiTrigger,
		setFilters,
		loading,
		data: apiData,
	};
};

export default useListShipmentAudits;