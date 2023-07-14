import { useDebounceQuery } from '@cogoport/forms';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useMemo, useEffect } from 'react';

import ENRICHMENT_API_MAPPING from '../../../constants/enrichment-api-mapping';
import getEnrichmentColumns from '../configurations/get-enrichment-columns';

import useFeedbackResponseSubmission from './useFeedbackResponseSubmission';

const geo = getGeoConstants();

const useEnrichmentDashboard = ({ primaryTab = 'manual_enrichment', secondaryTab = 'active' }) => {
	const router = useRouter();

	const { profile } = useSelector((state) => state || {});

	const { onEnrichmentClick } = useFeedbackResponseSubmission();

	const {
		partner: { id: partner_id },
		user: { id: user_id },
		auth_role_data: { id:authRoleId },
		selected_agent_id, authParams,
	} = profile;

	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();

	const [searchValue, setSearchValue] = useState('');

	const [selectedRowId, setSelectedRowId] = useState('');

	const allowedToSeeAgentsData = geo.uuid.third_party_enrichment_agencies_rm_ids.includes(authRoleId)
	&& primaryTab === 'manual_enrichment';

	const filtersMapping = useMemo(() => ({
		manual_enrichment: {
			status: secondaryTab,
		},
		file_management: {
			user_id,
		},
	}), [secondaryTab, user_id]);

	const [params, setParams] = useState({
		sort_by    : 'created_at',
		sort_type  : 'desc',
		page_limit : 10,
		page       : 1,
		...(allowedToSeeAgentsData && {
			user_data_required: true,
		}),
		filters: {
			...filtersMapping[primaryTab],
			q: searchQuery || undefined,
			partner_id,

		},
	});

	const { api: apiName, authkey } = ENRICHMENT_API_MAPPING[primaryTab];

	const [{ loading, data }, refetch] = useAllocationRequest({
		url    : `/${apiName}`,
		method : 'get',
		authkey,
		params,
	}, { manual: false });

	const { list = [], ...paginationData } = data || {};

	const getNextPage = (newPage) => {
		setParams((previousParams) => ({
			...previousParams,
			page: newPage,
		}));
	};

	useEffect(() => {
		setParams((previousParams) => ({
			...previousParams,
			filters: {
				...previousParams.filters,
				q       : searchQuery || undefined,
				user_id : selected_agent_id || undefined,
			},
		}));
	}, [searchQuery, selected_agent_id]);

	useEffect(() => {
		refetch();
	}, [authParams, refetch]);

	useEffect(() => {
		setParams((previousParams) => ({
			...previousParams,
			...(allowedToSeeAgentsData && {
				user_data_required: true,
			}),
			filters: {
				...filtersMapping[primaryTab],
				partner_id,
			},

		}));
	}, [allowedToSeeAgentsData, filtersMapping, partner_id, primaryTab]);

	useEffect(() => {
		setParams((previousParams) => ({
			...previousParams,
			...(allowedToSeeAgentsData && {
				user_data_required: true,
			}),
			filters: {
				...previousParams?.filters,
				user_id : selected_agent_id || undefined,
				status  : [secondaryTab],
			},
		}));
	}, [allowedToSeeAgentsData, secondaryTab, selected_agent_id]);

	const handleEditDetails = (feedback_request_id) => {
		router.push('/enrichment/[id]', `/enrichment/${feedback_request_id}`);
	};

	const columns = getEnrichmentColumns({
		handleEditDetails,
		selectedRowId,
		setSelectedRowId,
		onEnrichmentClick,
		refetch,
		secondaryTab,
	});

	const allowedColumns = geo.navigations.enrichment[primaryTab].possible_columns;

	const filteredColumns = columns.filter((listItem) => allowedColumns?.includes(listItem.id));

	return {
		refetch,
		columns: filteredColumns,
		list,
		paginationData,
		loading,
		setParams,
		getNextPage,
		debounceQuery,
		searchValue,
		setSearchValue,
		authRoleId,
	};
};

export default useEnrichmentDashboard;
