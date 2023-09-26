import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useListRecommendServiceExpertise = ({ defaultFilters = {}, defaultParams = {} }) => {
	const [data, setData] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : '/list_recommend_service_expertise',
		params : {
			filters: { ...(defaultFilters || {}) },
			...(defaultParams || {}),
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
		data, loading,
	};
};

export default useListRecommendServiceExpertise;
