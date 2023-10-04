import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useGetOrganizationServiceDetails = ({ defaultParams = {} }) => {
	const [data, setData] = useState({});
	const [{ loading }, trigger] = useRequest({
		url    : 'get_organization_service_details',
		params : { ...(defaultParams || {}) },
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
		data, loading, apiTrigger,
	};
};

export default useGetOrganizationServiceDetails;
