import { useAthenaRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useAthenaFileDetails = ({ fileId = '' }) => {
	const [data, setData] = useState({});

	const [{ loading }, trigger] = useAthenaRequest({
		url    : `/athena/athena-file-details/${fileId}`,
		method : 'get',
	}, { manual: true });

	const fetchFileDetails = useCallback(async () => {
		try {
			const res = await trigger();
			if (res?.data)setData(res?.data || {});
		} catch (err) {
			toastApiError(err);
			setData({});
		}
	}, [trigger]);

	useEffect(() => {
		fetchFileDetails();
	}, [fetchFileDetails]);

	return {
		data,
		loading,
		fetchFileDetails,
	};
};

export default useAthenaFileDetails;
