import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

import toastApiError from '../../../commons/toastApiError';

const useGetOrganizationUsers = ({ organizationId, showElement = false }) => {
	const [param, setParam] = useState({ page: 1, page_limit: 10 });

	const [
		{ data, loading },
		trigger,
	] = useRequest(
		{
			url     : '/list_organization_users',
			method  : 'get',
			authKey : 'get_list_organization_users',
		},
		{ manual: true },
	);

	useEffect(() => {
		try {
			const fetchListDataApi = async () => {
				await trigger({
					params: {
						filters: {
							organization_id : organizationId,
							status          : 'active',
						},
					},
				});
			};
			if (showElement) {
				fetchListDataApi();
			}
		} catch (e) {
			toastApiError(e);
		}
	}, [param?.page, trigger, organizationId, showElement]);

	return {
		organizationData: data,
		loading,
		param,
		setParam,
	};
};

export default useGetOrganizationUsers;
