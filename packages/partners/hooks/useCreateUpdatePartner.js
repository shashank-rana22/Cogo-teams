import { Toast } from '@cogoport/components';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

import toastApiError from '../utils/toastApiError';

const useCreateUpdatePartner = () => {
	const [url, setUrl] = useState('');
	const [apiData, setApiData] = useState({});
	const [{ loading }, trigger] = useRequest({
		url,
		method: 'POST',
	}, { manual: true });

	const createUpdatePartner = async (data) => {
		const payload = { ...data };
		try {
			const res = await trigger({ data: payload });

			setApiData(res?.data || {});
			Toast.success('Partner Added Successfully');
		} catch (err) {
			setApiData({});

			toastApiError(err);
		}
	};
	return {
		loading,
		apiData,
		createUpdatePartner,
		setUrl,
	};
};

export default useCreateUpdatePartner;
