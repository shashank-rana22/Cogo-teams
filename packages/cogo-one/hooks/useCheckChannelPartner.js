import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useCallback } from 'react';

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
	formattedMessageData = {},
}) => {
	const userId = formattedMessageData?.user_id;

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

		const linkSuffix = activeConversationTab === 'message'
			? `source=communication&active_chat=${activeCardId}` : 'source=communication';

		if (isChannelPartner) {
			let redirectionLink = `/${partnerId}/prm/
			${userPartnerId}?${linkSuffix}${userId ? `&user_id=${userId}` : ''}`;
			redirectionLink = prm
				? `${redirectionLink}&omniChannelActiveTab=${prm}`
				: redirectionLink;
			window.open(redirectionLink, '_blank');
			return;
		}

		let crmRedirect = `/${partnerId}/details/demand/${ORGID}?${linkSuffix}${userId ? `&user_id=${userId}` : ''}`;

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
		data,
		loading,
		orgId,
		activeConversationTab,
		activeCardId,
		partnerId,
		formattedMessageData,
	});

	return {
		openNewTab, loading, disableQuickActions, hideCpButton, getOrgDetails,
	};
};
export default useCheckChannelPartner;
