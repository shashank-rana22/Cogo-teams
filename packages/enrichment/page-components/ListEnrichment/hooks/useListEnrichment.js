import { useDebounceQuery } from '@cogoport/forms';
import { useRouter } from '@cogoport/next';
import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useEffect } from 'react';

import AUTH_KEY_MAPPING from '../../../constants/auth-key-mapping';
import getEnrichmentColumns from '../configurations/get-enrichment-columns';

import useMarkEnrichmentComplete from './useMarkEnrichmentComplete';

const useListEnrichment = () => {
	const router = useRouter();

	const { profile, general } = useSelector((state) => state || {});

	const { onEnrichmentClick = () => {} } = useMarkEnrichmentComplete();

	const { partner: { id: partner_id }, user: { id: user_id } } = profile;

	const { query: { tab = '' }, locale = '' } = general;

	const { debounceQuery, query: searchQuery = '' } = useDebounceQuery();

	const [searchValue, setSearchValue] = useState('');

	const [selectedRowId, setSelectedRowId] = useState('');

	const [activeTab, setActiveTab] = useState(tab || 'enrichment_requests');

	const [apiName, setApiName] = useState('feedback_requests');

	const [showUpload, setShowUpload] = useState(false);

	const [params, setParams] = useState({
		sort_by    : 'created_at',
		sort_type  : 'desc',
		page_limit : 10,
		page       : 1,
		filters    : {
			q: searchQuery || undefined,
			partner_id,
			user_id,
		},
	});

	const [globalFilters, setGlobalFilters] = useState({
		organization_id         : undefined,
		created_at_greater_than : undefined,
		created_at_less_than    : undefined,

	});

	const [{ loading, data }, refetch] = useAllocationRequest({
		url     : `/${apiName}`,
		method  : 'get',
		authkey : AUTH_KEY_MAPPING[apiName],
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
				q: searchQuery || undefined,
			},
		}));
	}, [searchQuery]);

	useEffect(() => {
		if (activeTab === 'enrichment_requests') {
			setApiName('feedback_requests');
		}

		setParams((prev) => ({
			...prev,

			filters: {
				...prev.filters,
				status: activeTab === 'requests_sent' ? 'responded' : 'active',
			},
		}));
	}, [activeTab]);

	const handleUploadClick = (feedback_request_id) => {
		router.push(`/enrichment/[id]?tab=${activeTab}`, `/enrichment/${feedback_request_id}?tab=${activeTab}`);
	};

	const columns = getEnrichmentColumns({
		handleUploadClick,
		selectedRowId,
		setSelectedRowId,
		onEnrichmentClick,
		refetch,
	});

	return {
		columns,
		listRefetch :	refetch,
		locale,
		list,
		paginationData,
		loading,
		setParams,
		getNextPage,
		showUpload,
		setShowUpload,
		activeTab,
		setActiveTab,
		globalFilters,
		setGlobalFilters,
		debounceQuery,
		searchValue,
		setSearchValue,
		partnerId   : partner_id,
		setApiName,
	};
};

export default useListEnrichment;
