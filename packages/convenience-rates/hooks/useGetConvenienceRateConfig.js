import { useRouter } from '@cogoport/next';
import { useRequest } from '@cogoport/request';
import { useState, useCallback, useEffect } from 'react';

import toastApiError from '../utils/toastApiError';

const useGetConvenienceRateConfig = ({ activeList }) => {
	const [data, setData] = useState({});
	const router = useRouter();
	const { convenience_rate_id = '' } = router?.query || {};

	const [{ loading }, trigger] = useRequest({
		url    : '/get_convenience_rate_configuration',
		method : 'GET',
		params : {
			id     : convenience_rate_id,
			status : activeList,
		},
	}, { manual: true });
	const listConvenienceRateConfig = useCallback(async () => {
		try {
			const res = await trigger({});
			if (res?.data) {
				setData(res.data.data);
			}
		} catch (err) {
			toastApiError(err);
			setData({});
		}
	}, [trigger]);

	useEffect(() => {
		listConvenienceRateConfig();
	}, [listConvenienceRateConfig]);
	return {
		data,
		loading,
	};
};

export default useGetConvenienceRateConfig;
