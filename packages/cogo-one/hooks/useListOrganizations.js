/* eslint-disable no-undef */
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

import { PARAMOUNT_ORG_ID } from '../constants/IDS_CONSTANTS';

const useListOrganizations = ({ orgId = null, activeCardId = null, activeTab:activeConversationTab = '' }) => {
	const partnerId = useSelector((s) => s?.profile?.partner?.id);

	const [{ data, loading }, trigger] = useRequest(

		{
			url    : '/list_organizations',
			method : 'get',
		},
		{ manual: true },
	);
	const getOrgDetails = async () => {
		try {
			await trigger({
				params: {
					filters: {
						id: orgId,
					},
				},
			});
		} catch (error) {
			// console.log(error);
		}
	};
	useEffect(() => {
		if (orgId) {
			getOrgDetails();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [orgId]);

	const { list = [] } = data || {};
	const { tags = [], partner_id:channelPartnerID = null } = list?.[0] || {};

	const isChannelPartner = tags?.includes('partner') || false;
	const ORGID = orgId || PARAMOUNT_ORG_ID;
	let ORG_PAGE_URL = '';
	const disableQuickActions = isChannelPartner && !channelPartnerID;
	const openNewTab = (activeTab) => {
		const { crm = undefined, prm = undefined } = activeTab || {};
		const linkSuffix = activeConversationTab === 'message'
			? `source=communication&active_chat=${activeCardId}` : 'source=communication';
		if (isChannelPartner && channelPartnerID) {
			ORG_PAGE_URL = `/${partnerId}/prm/${channelPartnerID}?${linkSuffix}`;
			const PRM_ROUTE_PAGE = prm
				? `${ORG_PAGE_URL}&omniChannelActiveTab=${prm}`
				: ORG_PAGE_URL;
				// eslint-disable-next-line no-undef
			window.open(PRM_ROUTE_PAGE, '_blank');
		} else if (!isChannelPartner) {
			ORG_PAGE_URL = `/${partnerId}/details/demand/${ORGID}?${linkSuffix}`;
			const CRM_ROUTE_PAGE = crm
				? `${ORG_PAGE_URL}&omniChannelActiveTab=${crm}`
				: ORG_PAGE_URL;
				// eslint-disable-next-line no-undef
			window.open(CRM_ROUTE_PAGE, '_blank');
		}
	};

	return {
		openNewTab, loading, disableQuickActions,
	};
};
export default useListOrganizations;
