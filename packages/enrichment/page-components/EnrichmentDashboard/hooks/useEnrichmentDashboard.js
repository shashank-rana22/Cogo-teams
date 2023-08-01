import { useDebounceQuery } from '@cogoport/forms';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useEffect } from 'react';

import getEnrichmentColumnsData from '../configurations/get-enrichment-columns-data';

const useEnrichmentDashboard = ({ secondaryTab = 'active' }) => {
	const router = useRouter();

	const { profile } = useSelector((state) => state || {});

	const geo = getGeoConstants();

	const {
		partner: { id: partner_id },
		user: { id: user_id },
		auth_role_data: { id: authRoleId },
		selected_agent_id,
		authParams,
	} = profile;

	const allowedToSeeAgentsData = geo.uuid.third_party_enrichment_agencies_rm_ids.includes(authRoleId);

	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();

	const [searchValue, setSearchValue] = useState('');
	const [actionModal, setActionModal] = useState({
		show        : false,
		requestData : {},
	});

	const [selectedRowId, setSelectedRowId] = useState('');

	const [params, setParams] = useState({
		sort_by    : 'created_at',
		sort_type  : 'desc',
		page_limit : 10,
		page       : 1,
		...(allowedToSeeAgentsData && {
			user_data_required: true,
		}),
		filters: {
			status  : secondaryTab,
			user_id : selected_agent_id || undefined,
			q       : searchQuery || undefined,
			partner_id,
		},
	});

	const [{ loading, data }, refetch] = useAllocationRequest(
		{
			url     : '/feedback_requests',
			method  : 'get',
			authkey : 'get_allocation_feedback_requests',
			params,
		},
		{ manual: false },
	);

	const { list = [], ...paginationData } = data || {};

	const getNextPage = (newPage) => {
		setParams((previousParams) => ({
			...previousParams,
			page: newPage,
		}));
	};

	useEffect(() => {
		refetch();
	}, [authParams, refetch]);

	useEffect(() => {
		setParams((previousParams) => ({
			...previousParams,
			user_data_required : allowedToSeeAgentsData ? true : undefined,
			filters            : {
				status  : secondaryTab,
				user_id : selected_agent_id || undefined,
				q       : searchQuery || undefined,
				partner_id,

			},
		}));
	}, [allowedToSeeAgentsData, partner_id, searchQuery, secondaryTab, selected_agent_id, user_id]);

	const handleEditDetails = (feedback_request_id, action) => {
		router.push(`/enrichment/${feedback_request_id}?action_type=${action}`);
	};

	const columns = getEnrichmentColumnsData({
		handleEditDetails,
		selectedRowId,
		setSelectedRowId,
		refetch,
		secondaryTab,
		user_id,
		actionModal,
		setActionModal,
	});

	return {
		refetch,
		columns,
		list,
		paginationData,
		loading,
		setParams,
		getNextPage,
		debounceQuery,
		searchValue,
		setSearchValue,
		authRoleId,
		actionModal,
		setActionModal,
	};
};

export default useEnrichmentDashboard;
