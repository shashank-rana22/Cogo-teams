import { useDebounceQuery } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { useEffect, useCallback, useState } from 'react';

const API_MAPPING = {
	organizations         : 'list_organizations',
	lead_organizations    : 'list_lead_organizations',
	channel_partners      : 'list_channel_partners',
	lead_channel_partners : 'list_lead_channel_partners',
};

const getParam = ({ orgId, searchValue, activeTab }) => ({
	filters: {
		status : activeTab.includes('lead') ? undefined : 'active',
		q      : searchValue || undefined,
		...(activeTab.includes('channel_partners')
			? {
				is_importer_exporter      : true,
				twin_importer_exporter_id : !searchValue ? orgId || undefined : undefined,
			} : {
				id                 : !searchValue ? orgId || undefined : undefined,
				account_type       : 'importer_exporter',
				is_channel_partner : false,
			}),
	},
});

const useGetOrganizations = ({
	orgId = '',
	activeTab = '',
	type = '',
	allowedOrgs = [],
	setEmailState = () => {},
}) => {
	const [query, setQuery] = useState('');
	const [searchQuery, setSearchQuery] = useState('');
	const [initialLoad, setInitialLoad] = useState(true);
	const { query: searchValue = '', debounceQuery } = useDebounceQuery();

	const [{ loading, data = {} }, trigger] = useRequest({
		url    : `/${API_MAPPING[activeTab] || ''}`,
		method : 'get',
	}, { manual: true });

	const getOrganizations = useCallback(async () => {
		try {
			if (!API_MAPPING[activeTab]) {
				return;
			}
			await trigger({
				params: getParam({ orgId, searchValue: searchQuery, activeTab }),
			});
			setInitialLoad(false);
		} catch (error) {
			console.error(error);
			setInitialLoad(false);
		}
	}, [activeTab, trigger, orgId, searchQuery]);

	useEffect(() => {
		if (!allowedOrgs.includes(activeTab)) {
			setEmailState(
				(prev) => ({
					...prev,
					orgData: {
						...prev?.orgData,
						orgType: allowedOrgs?.[GLOBAL_CONSTANTS.zeroth_index],
					},
				}),
			);
		}
	}, [activeTab, allowedOrgs, setEmailState]);

	useEffect(() => {
		debounceQuery(query?.trim());
	}, [debounceQuery, query]);

	useEffect(() => {
		setSearchQuery(searchValue || '');
	}, [searchValue]);

	useEffect(() => {
		if (type === 'toUserEmail' && allowedOrgs.includes(activeTab)) {
			getOrganizations();
		}
	}, [activeTab, allowedOrgs, getOrganizations, type]);

	return {
		organizationData     : loading ? {} : data,
		organizationsLoading : loading,
		getOrganizations,
		query,
		setQuery,
		setSearchQuery,
		initialLoad,
	};
};

export default useGetOrganizations;
