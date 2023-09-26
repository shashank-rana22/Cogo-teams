import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

import { VALUE_ONE } from '../../constants';

const useListAutomationParameter = () => {
	const [filters, setFilter] = useState({ service_type: 'fcl_freight_service', status: 'active' });
	const [page, setPage] = useState(VALUE_ONE);

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_revenue_desk_automation_parameters',
		method : 'get',
	}, { manual: true });

	const listAutomationParameter = useCallback(async () => {
		try {
			await trigger({ params: { filters }, page, pagination_data_required: true });
		} catch (error) {
			// console.log(error);
		}
	}, [filters, trigger, page]);

	const refetch = () => { listAutomationParameter(); };

	useEffect(() => {
		listAutomationParameter();
	}, [listAutomationParameter, filters, page]);

	return { loading, data, filters, setFilter, refetch, page, setPage };
};

export default useListAutomationParameter;
