import { useRequest } from '@cogoport/request';
import { useCallback, useState, useEffect } from 'react';

import toastApiError from '../utils/toastApiError';

const useGetOrganizations = () => {
	const [apiData, setApiData] = useState({});
	const [, trigger] = useRequest({
		url    : '/list_organizations',
		method : 'GET',
	}, { manual: true });
	const apiTrigger = useCallback(async (values) => {
		try {
			const res = await trigger({
				params: {
					filters: {
						account_type        : 'importer_exporter',
						registration_number : values?.registration_number,
					},
				},
			});

			setApiData(res?.data || {});
		} catch (err) {
			setApiData({});

			toastApiError(err);
		}
	}, [trigger]);
	useEffect(() => {
		apiTrigger();
	}, [apiTrigger]);

	return {
		data: apiData,
		apiTrigger,
	};
};
export default useGetOrganizations;
