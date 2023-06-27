import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const useListOrganizationUsers = ({ user_id = '', isChannelPartner, branch_id = '' }) => {
	const { query = '', debounceQuery } = useDebounceQuery();

	const [firstReloadDone, setFirstReloadDone] = useState(false);

	const [{ data:users, loading:usersLoading }, trigger] = useRequest({
		url    : '/list_organization_users',
		method : 'get',
		params : {
			filters: {
				organization_id        : user_id,
				status                 : !isChannelPartner ? 'active' : undefined,
				organization_branch_id : branch_id,
			},
			page_limit: 30,
		},
	}, { manual: false });

	const refetchOrganizationUsers = useCallback(() => {
		trigger({
			params: {
				filters: {
					organization_id        : user_id,
					status                 : !isChannelPartner ? 'active' : undefined,
					organization_branch_id : branch_id,
					q                      : query,
				},
				page_limit: 30,
			},
		});
	}, [branch_id, isChannelPartner, query, trigger, user_id]);

	useEffect(() => {
		if (query || (!query && firstReloadDone)) {
			refetchOrganizationUsers();

			setFirstReloadDone(true);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [query]);

	return {
		debounceQuery,
		users,
		usersLoading,
	};
};

export default useListOrganizationUsers;
