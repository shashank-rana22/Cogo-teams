import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector, useDispatch } from '@cogoport/store';
import { setProfileState } from '@cogoport/store/reducers/profile';
import { useCallback, useEffect, useState } from 'react';

const DEFAULT_PAGE_NUMBER = 1;

const getParams = ({ query, page }) => ({
	filters                            : query ? { q: query } : undefined,
	lead_user_data_required            : true,
	agent_data_required                : true,
	lead_organization_data_required    : true,
	communication_log_count_required   : true,
	machine_intelligence_data_required : true,
	feedback_count_required            : true,
	page,
	page_limit                         : 6,
});

const useListLeadOrgUsers = () => {
	const {
		refetchList = false,
		partnerId = '',
	} = useSelector(({ profile }) => ({
		refetchList : profile?.lead_feedback_form_data?.refetch_list,
		partnerId   : profile?.partner.id,
	}));

	const dispatch = useDispatch();

	const [search, setSearch] = useState('');

	const [{ data, loading }, trigger] = useRequest({
		url    : '/list_lead_organization_users',
		method : 'get',
	}, { manual: true });

	const { debounceQuery, query } = useDebounceQuery();

	const clearRefectchList = useCallback(() => {
		dispatch(
			setProfileState({
				lead_feedback_form_data: {},
			}),
		);
	}, [dispatch]);

	const getOrganizationUsers = useCallback(({ page }) => {
		try {
			trigger({ params: getParams({ query, page }) });
		} catch (err) {
			console.error('err', err);
		}
	}, [query, trigger]);

	const handlePagination = (val) => {
		getOrganizationUsers({ page: val });
	};

	useEffect(() => {
		debounceQuery(search);
	}, [debounceQuery, search]);

	useEffect(() => {
		getOrganizationUsers({ page: DEFAULT_PAGE_NUMBER });
	}, [getOrganizationUsers]);

	useEffect(() => {
		if (!refetchList) {
			return;
		}

		getOrganizationUsers({ page: DEFAULT_PAGE_NUMBER });
		clearRefectchList();
	}, [clearRefectchList, getOrganizationUsers, refetchList]);

	return {
		data: loading ? {} : data,
		loading,
		search,
		setSearch,
		handlePagination,
		partnerId,
		getOrganizationUsers,
	};
};
export default useListLeadOrgUsers;
