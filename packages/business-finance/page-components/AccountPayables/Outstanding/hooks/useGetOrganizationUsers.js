import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

import toastApiError from '../../../commons/toastApiError.ts';

const useGetOrganizationUsers = ({ organizationId, setStats = () => { } }) => {
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
							organization_id: organizationId,
						},
					},
				});
			};
			fetchListDataApi();
		} catch (e) {
			toastApiError(e);
		}
	}, [param?.page, trigger, organizationId]);

	useEffect(() => {
		setStats(((prevStats) => ({ ...prevStats, organization_users: data?.total_count })));
	}, [data, setStats]);

	return {
		organizationData: data,
		loading,
		param,
		setParam,
	};
};

export default useGetOrganizationUsers;
