import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useListOrganizationServiceExpertises = ({ defaultParams = {}, defaultFilters = {} }) => {
	const [filters, setFilters] = useState({});
	const { page = 1, ...restFilters } = filters;
	const [data, setData] = useState({});
	const [{ loading }, trigger] = useRequest({
		url    : '/list_organization_service_expertises',
		params : {
			filters: {
				...(defaultFilters || {}),
				...(restFilters || {}),
			},
			...(defaultParams || {}),
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
	return {
		data, loading, filters, setFilters,
	};
};

export default useListOrganizationServiceExpertises;
