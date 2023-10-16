import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

import { FIREBASE_TABS } from '../constants';

import useGetOrganizationUsersList from './useGetOrganizationUsersList';

const getParams = ({ orgId = '' }) => ({
	id                 : orgId,
	user_data_required : true,
});

const formatData = ({
	data = {}, loading = false,
	orgId = '',
	activeConversationTab = '',
	activeCardId = '',
	partnerId = '',
	userId = '',
	isSendUserIdInPath,
}) => {
	const { data: orgDetails = {} } = data || {};
	const { tags = [], twin_partner = {} } = orgDetails || {};

	const isChannelPartner = loading ? false : tags?.includes('partner') || false;

	const {
		id: userPartnerId = '',
		twin_importer_exporter_id = '',
	} = twin_partner || {};

	const ORGID = orgId || GLOBAL_CONSTANTS.uuid.paramount_org_id;

	const disableQuickActions = isChannelPartner && !(twin_importer_exporter_id);

	const hideCpButton = isChannelPartner || loading;

	const openNewTab = (activeTab) => {
		if (disableQuickActions) {
			return;
		}

		const { crm = '', prm = '' } = activeTab || {};

		const linkSuffix = FIREBASE_TABS.includes(activeConversationTab)
			? `source=communication&active_chat=${activeCardId}` : 'source=communication';

		if (isChannelPartner) {
			let redirectionLink = `/${partnerId}/prm/
			${userPartnerId}?${linkSuffix}${isSendUserIdInPath ? `&user_id=${userId}` : ''}`;
			redirectionLink = prm
				? `${redirectionLink}&omniChannelActiveTab=${prm}`
				: redirectionLink;
			window.open(redirectionLink, '_blank');
			return;
		}

		let crmRedirect = `/${partnerId}/details/demand/${ORGID}?
		${linkSuffix}${isSendUserIdInPath ? `&user_id=${userId}` : ''}`;

		crmRedirect = crm
			? `${crmRedirect}&omniChannelActiveTab=${crm}`
			: crmRedirect;

		window.open(crmRedirect, '_blank');
	};

	return {
		openNewTab, hideCpButton, disableQuickActions,
	};
};

const useCheckChannelPartner = ({
	orgId = null, activeCardId = null,
	activeTab: activeConversationTab = '', formattedMessageData = {},
}) => {
	const partnerId = useSelector((s) => s?.profile?.partner?.id);
	const userId = formattedMessageData?.user_id;

	const { orgLoading = false, isOrgUserIdPresent = false } = useGetOrganizationUsersList({ orgId, userId });

	const isSendUserIdInPath = !isEmpty(orgId) && !isEmpty(userId) && isOrgUserIdPresent && !orgLoading;

	const [{ data, loading }, trigger] = useRequest(
		{
			url    : '/get_organization',
			method : 'get',
		},
		{ manual: true },
	);

	const getOrgDetails = useCallback(() => {
		if (!orgId) {
			return;
		}

		try {
			trigger({
				params: getParams({ orgId }),
			});
		} catch (error) {
			console.error(error);
		}
	}, [orgId, trigger]);

	useEffect(() => {
		getOrgDetails();
	}, [getOrgDetails]);

	const {
		openNewTab, hideCpButton, disableQuickActions,
	} = formatData({
		data: (!orgId || loading) ? {} : data,
		loading,
		orgId,
		activeConversationTab,
		activeCardId,
		partnerId,
		userId,
		isSendUserIdInPath,
	});

	return {
		openNewTab,
		loading,
		disableQuickActions,
		hideCpButton,
		getOrgDetails,
		organizationData: data?.data || {},
	};
};
export default useCheckChannelPartner;
