import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useAllocationConfigurations = () => {
	const [showCreateConfig, setShowCreateConfig] = useState(false);

	const [showPublishConfiguration, setShowPublishConfiguration] =		useState(false);

	const [showUpdatePreference, setShowUpdatePreference] = useState(false);

	const [params, setParams] = useState({
		sort_type : 'desc',
		sort_by   : 'created_at',
		page      : 1,
		filters   : {
			status: ['active', 'draft', 'publishable', 'checking', 'not_publishable'],
		},
	});

	const listAllocationConfigurationsAPI = useRequest({
		url    : '/list_allocation_configurations',
		method : 'get',
		params,
	}, { manual: true });

	const fetchList = async () => {
		await listAllocationConfigurationsAPI.trigger({ params });
	};

	const getNextPage = (newPage) => {
		setParams((previousParams) => ({
			...previousParams,
			page: newPage,
		}));
	};

	useEffect(() => {
		fetchList();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params]);

	const { loading = false, data: { list = [], ...paginationData } = {} } = listAllocationConfigurationsAPI;

	return {
		loading,
		list,
		paginationData,
		showCreateConfig,
		setShowCreateConfig,
		// fetchList,
		getNextPage,
		params,
		setParams,
		showPublishConfiguration,
		setShowPublishConfiguration,
		showUpdatePreference,
		setShowUpdatePreference,
	};
};

export default useAllocationConfigurations;
