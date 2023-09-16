import { useAthenaRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useAthenaFileStats = () => {
	const [data, setData] = useState({});

	const [{ loading }, trigger] = useAthenaRequest({
		url    : '/athena/athena-files-stats',
		method : 'get',
	}, { manual: true });

	const fetchFileStats = useCallback(async () => {
		try {
			const res = await trigger();
			if (res?.data) {
				setData(res?.data);
			}
		} catch (err) {
			toastApiError(err);
			setData({});
		}
	}, [trigger]);

	useEffect(() => {
		fetchFileStats();
	}, [fetchFileStats]);

	return {
		data,
		statsLoading: loading,
		fetchFileStats,
	};
};

export default useAthenaFileStats;
