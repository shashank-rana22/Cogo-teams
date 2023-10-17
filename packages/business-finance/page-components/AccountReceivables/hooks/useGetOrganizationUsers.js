import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useGetOrganizationUsers = ({ selfOrganizationId }) => {
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
		const fetchListDataApi = async () => {
			await trigger({
				params: {
					filters: {
						organization_id : selfOrganizationId,
						status          : 'active',
					},
				},
			});
		};
		fetchListDataApi();
	}, [param.page, trigger, selfOrganizationId]);

	return {
		organizationData: data,
		loading,
		param,
		setParam,
	};
};

export default useGetOrganizationUsers;