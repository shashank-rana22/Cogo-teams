import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useListSageOrganizationIdMappings = ({ filterParams, defaultParams }) => {
	const [data, setData] = useState({});
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/list_sage_organization_id_mappings',
			params : {
				...(defaultParams || {}),
				filters: { ...(filterParams || {}) },
			},
		},
		{
			manual: true,
		},
	);
	const apiTrigger = useCallback(async () => {
		try {
			const res = await trigger();
			setData(res?.data);
		} catch (err) {
			setData({});
			toastApiError(err);
		}
	}, [trigger]);
	useEffect(() => {
		apiTrigger();
	}, [apiTrigger]);

	return { data, loading, apiTrigger, trigger };
};
export default useListSageOrganizationIdMappings;
