import { useRequest } from '@cogoport/request';
import { useCallback } from 'react';

import formatOrganizationUsers from '../helpers/formatOrganizationUsers';

const useListOrganizationUsers = () => {
	const [, trigger] = useRequest({
		url    : '/list_organization_users',
		method : 'get',
	}, { manual: true });

	const getOrganizationUsers = useCallback(async ({ setData }) => {
		const res = await trigger();

		const formattedUserData = formatOrganizationUsers({ data: res?.data });
		setData(formattedUserData);
	}, [trigger]);

	return {
		getOrganizationUsers,
	};
};
export default useListOrganizationUsers;
