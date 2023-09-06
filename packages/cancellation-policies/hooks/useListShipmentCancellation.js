import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

const useListShipmentCancellation = ({ defaultFilters = {} }) => {
	const [data, setData] = useState({});
	const [filters, setFilters] = useState({});

	const { page = 1, ...restFilters } = filters || {};

	const [{ loading }, trigger] = useRequest({
		url    : '/list_shipment_cancellation_charges',
		params : {
			filters: {
				status: 'active',
				...restFilters,
			},
			...(defaultFilters || {}),
			page,
		},
	}, { manual: true });

	const getShipmentCancellationCharges = useCallback(async () => {
		try {
			const res = await trigger();
			if (res?.data) { setData(res?.data); }
		} catch (err) {
			// console.error(err);
			setData({});
		}
	}, [trigger]);

	useEffect(() => {
		getShipmentCancellationCharges();
	}, [getShipmentCancellationCharges, filters]);

	// console.log({ data });

	return {
		data,
		loading,
		setFilters,
		filters,
		refetch: getShipmentCancellationCharges,
	};
};

export default useListShipmentCancellation;
