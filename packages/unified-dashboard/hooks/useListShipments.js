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
	}, { manual: true });

	useEffect(() => {
		const fetchShipments = async () => {
			try {
				const { agent_id, start_date, end_date } = filters;
				await trigger({
					params: {
						filters: {
							created_at_greater_than : start_date,
							created_at_less_than    : end_date,
							sales_agent_id          : agent_id,
						},
					},
				});
			} catch (err) {
				console.log(err, 'err');
			}
		};
		if (Object.keys(filters).length > 2) fetchShipments();
	}, [filters, trigger]);

	return {
		loading,
		shipments: data,
		setFilters,
		filters,
	};
};

export default useListShipments;
