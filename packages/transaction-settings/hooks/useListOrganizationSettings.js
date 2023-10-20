/* eslint-disable react-hooks/exhaustive-deps */
import { useRequest } from '@cogoport/request';
import { useState, useCallback, useEffect } from 'react';

import toastApiError from '../utils/toastApiError';

const useListOrganizationSettings = () => {
	const [apiData, setApiData] = useState({});

	const [filters, setFilters] = useState({});

	const { page = 1, ...restFilters } = filters;

	const [{ loading }, trigger] = useRequest({
		url    : '/list_organization_settings',
		params : {
			page,
			filters: {
				setting_type: 'pass_through',
				...restFilters,
			},

		},
	});

	const getData = useCallback(async () => {
		try {
			const res = await trigger();
			setApiData(res?.data || {});
			return res;
		} catch (err) {
			toastApiError(err);
			return {};
		}
	}, [trigger]);

	useEffect(() => {
		getData();
	}, [getData, filters, setFilters]);

	return {
		loading,
		data    : apiData,
		refetch : getData,
		filters,
		setFilters,
	};
};

export default useListOrganizationSettings;
