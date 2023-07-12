import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useEditApplicableAgents = (props) => {
	const { roles, formValues, setFormValues, setShowEditAgentsModal } = props;

	const { debounceQuery, query: searchQuery } = useDebounceQuery();

	const [searchValue, setSearchValue] = useState('');

	const [selectMode, setSelectMode] = useState(formValues.generalConfiguration?.selectMode || 'select_all');

	const [selectedAgentIds, setSelectedAgentIds] = useState(formValues.generalConfiguration?.user_ids || []);

	const [params, setParams] = useState({
		page       : 1,
		page_limit : 10,
		filters    : {
			role_ids : roles.map((role) => role.id),
			status   : 'active',
			q        : searchQuery || undefined,
		},
	});

	const [{ data, loading }] = useRequest({
		url    : 'list_partner_users',
		method : 'GET',
		params,
	}, { manual: false });

	const { list = [], ...paginationData } = data || {};

	const onApplyChanges = () => {
		if (selectMode === 'select_all') {
			setFormValues((previousValues) => ({
				...previousValues,
				generalConfiguration: {
					...(previousValues.generalConfiguration || {}),
					selectMode,
					user_ids: undefined,
				},
			}));
		} else {
			setFormValues((previousValues) => ({
				...previousValues,
				generalConfiguration: {
					...(previousValues.generalConfiguration || {}),
					selectMode,
					user_ids: selectedAgentIds,
				},
			}));
		}

		setShowEditAgentsModal(false);
	};

	const getNextPage = (nextPage) => {
		setParams((previousParams) => ({
			...previousParams,
			page: nextPage,
		}));
	};

	useEffect(() => {
		setParams((previousParams) => ({
			...previousParams,
			page    : 1,
			filters : {
				...(previousParams.filters || {}),
				q: searchQuery || undefined,
			},
		}));
	}, [searchQuery]);

	return {
		list,
		loading,
		getNextPage,
		paginationData,
		debounceQuery,
		searchValue,
		setSearchValue,
		selectMode,
		setSelectMode,
		selectedAgentIds,
		setSelectedAgentIds,
		onApplyChanges,
	};
};

export default useEditApplicableAgents;
