import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect } from 'react';

import { ACCOUNT_TYPE_MAPPING } from '../constants';
import { PARAMOUNT_ORG_ID } from '../constants/IDS_CONSTANTS';

import useListPartners from './useListPartners';

const useListOrganizations = ({ orgId = null, activeCardId = null, activeTab:activeConversationTab = '' }) => {
	const partnerId = useSelector((s) => s?.profile?.partner?.id);
	const { fetchPartnerId = () => {}, partnersLoading = false, channelPartnerId } = useListPartners();

	const [{ data, loading }, trigger] = useRequest(
		{
			url    : '/list_organizations',
			method : 'get',
		},
		{ manual: true },
	);
	const getOrgDetails = async () => {
		try {
			const res = await trigger({
				params: {
					filters: {
						id: orgId,
					},
				},
			});
			if (res?.data) {
				const { list = [] } = res?.data || {};
				const { tags = [], account_type = '' } = list?.[0] || {};
				if (tags?.includes('partner')) {
					await fetchPartnerId({ [ACCOUNT_TYPE_MAPPING[account_type]]: orgId });
				}
			}
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
	const { tags = [] } = list?.[0] || {};

	let isChannelPartner = loading ? false : tags?.includes('partner') || false;

	if (!orgId) {
		isChannelPartner = false;
	}

	const ORGID = orgId || PARAMOUNT_ORG_ID;

	let ORG_PAGE_URL = '';

	const disableQuickActions = isChannelPartner && !channelPartnerId;

	const openNewTab = (activeTab) => {
		const { crm = undefined, prm = undefined } = activeTab || {};
		const linkSuffix = activeConversationTab === 'message'
			? `source=communication&active_chat=${activeCardId}` : 'source=communication';
		if (isChannelPartner && channelPartnerId) {
			ORG_PAGE_URL = `/${partnerId}/prm/${channelPartnerId}?${linkSuffix}`;
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
		openNewTab, loading: partnersLoading || loading, disableQuickActions,
	};
};
export default useListOrganizations;
