import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useListOrganizationServices = ({ defaultParams = {}, defaultFilters = {} }) => {
	const [data, setData] = useState({});
	const [filters, setFilters] = useState({});
	const [params, setParams] = useState({});
	const { page = 1, ...restFilters } = filters;

	const [{ loading }, trigger] = useRequest({
		url    : '/list_organization_services',
		params : {
			filters: {
				...(defaultFilters || {}),
				...(restFilters || {}),
			},
			...(defaultParams || {}),
			...(params || {}),
			page,

		},

	}, { manual: true });

	const apiTrigger = useCallback(async () => {
		try {
			const res = await trigger();
			setData(res?.data);
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);
	useEffect(() => {
		apiTrigger();
	}, [apiTrigger]);

	return { data, loading, apiTrigger, filters, setFilters, params, setParams };
};

export default useListOrganizationServices;
