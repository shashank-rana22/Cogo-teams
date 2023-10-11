import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const FIRST_PAGE = 1;

const useGetCustomers = () => {
	const [data, setData] = useState({});
	const [filters, setFilters] = useState({});
	const [pagination, setPagination] = useState(FIRST_PAGE);

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
		pagination,
		setPagination,
	};
};

export default useGetCustomers;
