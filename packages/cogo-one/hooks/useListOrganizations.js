import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

const useListOrganizations = ({ orgId = null }) => {
	const partnerId = useSelector((s) => s?.profile?.partner?.id);

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

	const { tags = [], partner_id:channelPartnerID = null } = data || {};

	const ORG_ID = orgId || '272a2072-7009-4df9-b852-185bfa49a541';
	let ORG_PAGE_URL = '';
	const openNewTab = (activeTab) => {
		if (tags?.includes('partner')) {
			ORG_PAGE_URL = `/${partnerId}/prm/${channelPartnerID}`;
		} else {
			ORG_PAGE_URL = `/${partnerId}/details/demand/${ORG_ID}`;
		}
		// eslint-disable-next-line no-undef
		window.open(`${ORG_PAGE_URL}?omniChannelActiveTab=${activeTab}`, '_blank');
	};

	return {
		openNewTab, loading, ORG_PAGE_URL,
	};
};
export default useListOrganizations;
