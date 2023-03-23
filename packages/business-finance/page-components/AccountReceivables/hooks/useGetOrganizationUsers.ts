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

	const fetchListDataApi = async () => {
		await trigger({
			params: {
				filters: {
					organization_id: selfOrganizationId,
				},
			},
		});
	};

	useEffect(() => {
		fetchListDataApi();
	}, [param.page]);

	return {
		organizationData: data,
		loading,
		param,
		setParam,
	};
};

export default useGetOrganizationUsers;
