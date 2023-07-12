import { useRequest } from '@cogoport/request';
import { useCallback, useState } from 'react';

import formatOrganizationUsers from '../helpers/formatOrganizationUsers';

const getParams = ({ organizationId }) => ({
	organization_id : organizationId,
	page            : 1,
	page_Limit      : 1000,
});

const useListOrganizationUsers = () => {
	const [openOrgAccordian, setOpenOrgAccordian] = useState(false);

	const [data, trigger] = useRequest({
		url    : '/list_organization_users',
		method : 'get',
	}, { manual: true });

	const getOrganizationUsers = useCallback(async ({
		organizationId,
	}) => {
		try {
			await trigger({ params: getParams({ organizationId }) });
			setOpenOrgAccordian(true);
		} catch (err) {
			console.error('err', err);
		}
	}, [trigger]);

	return {
		getOrganizationUsers,
		formattedOrgUsersList: formatOrganizationUsers({ data }),
		openOrgAccordian,
		setOpenOrgAccordian,
	};
};
export default useListOrganizationUsers;
