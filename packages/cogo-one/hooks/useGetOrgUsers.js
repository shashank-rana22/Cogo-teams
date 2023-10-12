import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback, useState } from 'react';

const PAGE_LIMIT = 100;

const ORGANIZATION_ID_REQUIRED_FOR = ['organizations', 'pocs'];

const API_MAPPING = {
	organizations          : 'list_organization_users',
	other_organizations    : 'list_lead_users',
	channel_partners       : 'get_channel_partner_users',
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
	...(orgType === 'channel_partners'
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
}) => {
	const [query, setQuery] = useState('');
	const [initialLoad, setInitialLoad] = useState(true);

	const { query: searchQuery, debounceQuery } = useDebounceQuery();

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
				params: getPayload({ orgId, userIds: selectedUserIds, searchQuery, orgType }),
			});
			setInitialLoad(false);
		} catch (error) {
			console.error(error);
		}
	}, [orgId, orgType, searchQuery, trigger]);

	useEffect(
		() => {
			if (orgId && !(isLeadUser && type !== 'toUserEmail')) {
				fetchUser({ selectedUserIds: initialLoad ? userIds?.map((itm) => itm?.id) : undefined });
			}
		},
		[fetchUser, initialLoad, isLeadUser, orgId, type, userIds],
	);

	useEffect(() => {
		debounceQuery(query?.trim());
	}, [debounceQuery, query]);

	const isOrgUserIdPresent = !isEmpty(data?.list);

	const orgData = (
		loading
		|| !API_MAPPING[orgType]
		|| !orgId
		|| (isLeadUser && type !== 'toUserEmail')
	) ? {} : data;

	return {
		orgLoading   : loading,
		isOrgUserIdPresent,
		orgData,
		handleSearch : setQuery,
		initialLoad,
		searchQuery  : query,
	};
};

export default useGetOrgUsers;
