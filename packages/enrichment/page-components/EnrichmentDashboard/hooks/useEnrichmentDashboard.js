import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import getGeoConstants from '@cogoport/globalization/constants/geo';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useCallback, useMemo, useEffect } from 'react';

import ENRICHMENT_API_MAPPING from '../../../constants/enrichment-api-mapping';
import getEnrichmentColumns from '../configurations/get-enrichment-columns';

import useFeedbackResponseSubmission from './useFeedbackResponseSubmission';

const geo = getGeoConstants();

const useEnrichmentDashboard = ({
	primaryTab = 'manual_enrichment',
	secondaryTab = 'active',
}) => {
	const router = useRouter();

	const { profile } = useSelector((state) => state || {});

	const { onEnrichmentClick = () => {}, loadingComplete = false } = useFeedbackResponseSubmission();

	const {
		partner: { id: partner_id },
		user: { id: user_id },
		auth_role_data: { id: authRoleId },
		selected_agent_id,
		authParams,
	} = profile;

	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();

	const [searchValue, setSearchValue] = useState('');

	const [selectedRowId, setSelectedRowId] = useState('');

	const allowedToSeeAgentsData = geo.uuid.third_party_enrichment_agencies_rm_ids.includes(authRoleId)
    && primaryTab === 'manual_enrichment';

	const filtersMapping = useMemo(
		() => ({
			manual_enrichment: {
				status: secondaryTab,
			},
			file_management: {
				user_id,
			},
		}),
		[secondaryTab, user_id],
	);

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

	const [{ loading, data }, trigger] = useAllocationRequest(
		{
			url    : `/${apiName}`,
			method : 'get',
			authkey,
			params,
		},
		{ manual: false },
	);

	const refetchList = useCallback(async () => {
		try {
			setParams((previousParams) => ({
				...previousParams,
				filters: {
					...previousParams.filters,
					q       : searchQuery || undefined,
					user_id : selected_agent_id || undefined,
				},
			}));

			await trigger();
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
			}
		}
	}, [searchQuery, selected_agent_id, trigger]);

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
			...(allowedToSeeAgentsData && {
				user_data_required: true,
			}),
			filters: {
				...filtersMapping[primaryTab],
				partner_id,
				user_id : selected_agent_id || undefined,
				status  : [secondaryTab],
			},
		}));
	}, [allowedToSeeAgentsData, filtersMapping, partner_id, primaryTab, secondaryTab, selected_agent_id]);

	useEffect(() => {
		refetchList();
	}, [authParams, refetchList, selected_agent_id]);

	const handleEditDetails = (feedback_request_id) => {
		router.push('/enrichment/[id]', `/enrichment/${feedback_request_id}`);
	};

	const columns = getEnrichmentColumns({
		handleEditDetails,
		selectedRowId,
		setSelectedRowId,
		onEnrichmentClick,
		refetch: refetchList,
		loadingComplete,
		secondaryTab,
		user_id,
	});

	const allowedColumns = geo.navigations.enrichment[primaryTab].possible_columns;

	const filteredColumns = columns.filter((listItem) => allowedColumns?.includes(listItem.id));

	return {
		refetch : refetchList,
		columns : filteredColumns,
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
