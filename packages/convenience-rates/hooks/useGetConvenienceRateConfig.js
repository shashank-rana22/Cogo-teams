import { useRequest } from '@cogoport/request';
import { useState, useCallback, useEffect } from 'react';

import toastApiError from '../utils/toastApiError';

const useGetConvenienceRateConfig = ({ defaultParams = {}, initialCall = false }) => {
	const [data, setData] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : '/get_convenience_rate_configuration',
		method : 'GET',
		params : defaultParams,
	}, { manual: true });
	const getConvenienceRateConfig = useCallback(async () => {
		try {
			const res = await trigger();
			if (res?.data) {
				setData(res.data.data);
			}
		} catch (err) {
			toastApiError(err);
			setData({});
		}
	}, [trigger]);

	useEffect(() => {
		if (initialCall) getConvenienceRateConfig();
	}, [getConvenienceRateConfig, initialCall]);

	return {
		data,
		loading,
		getConvenienceRateConfig,
	};
};

export default useGetConvenienceRateConfig;
