import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

import toastApiError from '../utils/toastApiError';

const useGetOrganizationUsers = ({ orgId = '', setUser = () => {} }) => {
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
			setUser(res?.data?.list[GLOBAL_CONSTANTS.zeroth_index]?.user_id);
		} catch (error) {
			toastApiError(error);
		}
	}, [trigger, setUser]);

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
