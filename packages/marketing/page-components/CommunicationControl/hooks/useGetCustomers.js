import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useGetCustomers = ({ pagination = 1 }) => {
	const [data, setData] = useState({});
	const [filters, setFilters] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : '/list_organizations',
		method : 'GET',
		params : {
			page: pagination,
			filters,
		},
	}, { manual: true });

	const getCustomers = useCallback(async () => {
		try {
			const res = await trigger();
			setData(res?.data);
		} catch (error) {
			toastApiError(error);
		}
	}, [trigger]);

	useEffect(() => {
		getCustomers();
	}, [pagination, getCustomers]);

	return {
		data,
		loading,
		setFilters,
		getCustomers,
	};
};

export default useGetCustomers;
