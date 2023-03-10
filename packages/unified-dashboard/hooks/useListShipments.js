import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

import { getDefaultFilters } from '../utils/startDateOfMonth';

const useListShipments = () => {
	const [filters, setFilters] = useState({
		...getDefaultFilters('current_month', true),
	});
	const scope = useSelector(({ general }) => general.scope);

	const [{ loading, data }, trigger] = useRequest({
		url    : 'list_shipments',
		method : 'GET',
		scope,
	}, { manual: false });

	const fetchShipments = async () => {
		try {
			const { agent_id, start_date, end_date } = filters;
			const res = await trigger({
				params: {
					filters: {
						created_at_greater_than : start_date,
						created_at_less_than    : end_date,
						sales_agent_id          : agent_id,
					},
				},
			});
			const { hasError } = res || {};
			if (hasError) throw new Error();
			return data;
		} catch (err) {
			return false;
		}
	};

	useEffect(() => {
		if (Object.keys(filters).length > 2) fetchShipments();
	}, [filters]);

	return {
		loading,
		shipments: data,
		setFilters,
		filters,
	};
};

export default useListShipments;
