import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useGetOrganizationUsers = ({ orgId = '' }) => {
	const [data, setData] = useState({});

	const [{ loading }, trigger] = useRequest({
		url    : '/list_organization_users',
		method : 'GET',
		params : {
			page_limit : 100,
			filters    : {
				organization_id: orgId,
			},
		},
	}, { manual: true });

	const getOrganizationUsers = useCallback(async () => {
		try {
			const res = await trigger();
			setData(res?.data);
		} catch (error) {
			toastApiError(error);
		}
	}, [trigger]);

	useEffect(() => {
		getOrganizationUsers();
	}, [getOrganizationUsers]);

	return {
		list: data?.list,
		getOrganizationUsers,
		loading,
	};
};

export default useGetOrganizationUsers;
