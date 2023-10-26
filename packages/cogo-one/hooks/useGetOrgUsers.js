import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback, useState, useMemo } from 'react';

const PAGE_LIMIT = 100;

const ORGANIZATION_ID_REQUIRED_FOR = ['organizations', 'pocs'];

const API_MAPPING = {
	organizations          : 'list_organization_users',
	lead_organizations     : 'get_lead_organization_users',
	other_organizations    : 'list_lead_users',
	channel_partners       : 'get_channel_partner_users',
	lead_channel_partners  : 'get_lead_organization_users',
	other_channel_partners : 'list_lead_users',
	pocs                   : 'list_organization_billing_addresses',
};

const getPayload = ({ orgId = '', userIds = [], searchQuery = '', orgType = '' }) => ({
	filters: {
		status               : orgType === 'organizations' ? 'active' : undefined,
		id                   : isEmpty(userIds) ? undefined : userIds,
		q                    : searchQuery || undefined,
		organization_id      : ORGANIZATION_ID_REQUIRED_FOR.includes(orgType) ? orgId || undefined : undefined,
		is_importer_exporter : orgType === 'channel_partners' ? true : undefined,
		...(orgType?.includes('other') ? {
			is_channel_partner : orgType !== 'other_organizations',
			lifecycle_stage    : ['enriched', 'marketing_qualified'],
		} : {}),
	},
	lead_organization_id: orgType.includes('lead') ? orgId || undefined : undefined,
	...((orgType === 'channel_partners' || orgType === 'lead_channel_partners')
		? { account_types: ['importer_exporter'] }
		: {}),
	partner_id : orgType === 'channel_partners' ? orgId || undefined : undefined,
	page_limit : PAGE_LIMIT,
});

const useGetOrgUsers = ({
	orgId = '',
	userIds = null,
	orgType = '',
	type = '',
	isLeadUser = false,
	twinImporterExporterId = '',
	isChannelPartner = false,
}) => {
	const [query, setQuery] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [initialLoad, setInitialLoad] = useState(true);

	const { query: newQuery, debounceQuery } = useDebounceQuery();

	const [{ loading, data }, trigger] = useRequest({
		url    : `/${API_MAPPING[orgType] || ''}`,
		method : 'get',
	}, { manual: true });

	const fetchUser = useCallback(async ({ selectedUserIds }) => {
		try {
			if (!API_MAPPING[orgType]) {
				return;
			}
			await trigger({
				params: getPayload({
					orgId   : (isChannelPartner && orgType === 'pocs') ? twinImporterExporterId : orgId,
					userIds : selectedUserIds,
					searchQuery,
					orgType,
				}),
			});
			setInitialLoad(false);
		} catch (error) {
			console.error(error);
		}
	}, [isChannelPartner, orgId, orgType, searchQuery, trigger, twinImporterExporterId]);

	const selectedUsers = useMemo(
		() => (initialLoad
			? userIds?.map(
				(itm) => itm?.id,
			) : undefined),
		[initialLoad, userIds],
	);

	useEffect(
		() => {
			if (orgId && !(isLeadUser && type !== 'toUserEmail')) {
				fetchUser({ selectedUserIds: selectedUsers });
			}
		},
		[fetchUser, isLeadUser, orgId, type, selectedUsers],
	);

	useEffect(() => {
		debounceQuery(query?.trim());
	}, [debounceQuery, query]);

	useEffect(
		() => {
			setSearchQuery(newQuery);
		},
		[newQuery],
	);

	const orgData = (
		loading
		|| !API_MAPPING[orgType]
		|| !orgId
		|| (isLeadUser && type !== 'toUserEmail')
	) ? {} : data;

	return {
		orgLoading         : loading,
		orgData,
		handleSearch       : setQuery,
		initialLoad,
		searchQuery        : query,
		setUserSearchQuery : setSearchQuery,
	};
};

export default useGetOrgUsers;
