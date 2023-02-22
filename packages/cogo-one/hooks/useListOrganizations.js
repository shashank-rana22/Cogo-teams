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

	const { list = [] } = data || {};
	const { tags = [], partner_id:channelPartnerID = null } = list?.[0] || {};

	const isChannelPartner = tags?.includes('partner') || false;

	const ORG_ID = orgId || '272a2072-7009-4df9-b852-185bfa49a541';

	let ORG_PAGE_URL = '';
	const openNewTab = (activeTab) => {
		const { crm = undefined, prm = undefined } = activeTab || {};
		if (isChannelPartner) {
			ORG_PAGE_URL = `/${partnerId}/prm/${channelPartnerID}`;
			const CRM_ROUTE_PAGE = crm ? `${ORG_PAGE_URL}?omniChannelActiveTab=${prm}` : ORG_PAGE_URL;
			// eslint-disable-next-line no-undef
			window.open(CRM_ROUTE_PAGE, '_blank');
		} else {
			ORG_PAGE_URL = `/${partnerId}/details/demand/${ORG_ID}`;
			const PRM_ROUTE_PAGE = prm ? `${ORG_PAGE_URL}?omniChannelActiveTab=${prm}` : ORG_PAGE_URL;
			// eslint-disable-next-line no-undef
			window.open(PRM_ROUTE_PAGE, '_blank');
		}
	};

	return {
		openNewTab, loading, ORG_PAGE_URL,
	};
};
export default useListOrganizations;
