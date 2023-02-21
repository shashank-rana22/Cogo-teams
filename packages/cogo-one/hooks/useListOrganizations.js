import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useListOrganizations = ({ orgId = null }) => {
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
	return {
		data,
	};
};
export default useListOrganizations;
