import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useListOrganizations = ({ orgId = null }) => {
	console.log('orgId:', orgId);
	const [{ data, loading }, trigger] = useRequest(
		{
			url    : '/list_organizations',
			method : 'get',
		},
		{ manual: true },
	);
	const getOrgDetails = async () => {
		await trigger({
			params: {
				filters: {
					id: orgId,
				},
			},
		});
	};
	useEffect(() => {
		if (orgId) {
			getOrgDetails();
		}
	}, [orgId]);
	console.log('data:', data);
	return {
		data,
	};
};
export default useListOrganizations;
