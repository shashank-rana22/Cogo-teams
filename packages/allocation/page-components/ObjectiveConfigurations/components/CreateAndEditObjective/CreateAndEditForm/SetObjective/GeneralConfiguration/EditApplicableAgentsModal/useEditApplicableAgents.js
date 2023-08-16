import { useDebounceQuery } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

const useEditApplicableAgents = (props) => {
	const { watchRoles, formValues, setFormValues, setShowEditAgentsModal } = props;

	const { debounceQuery, query: searchQuery } = useDebounceQuery();

	const [searchValue, setSearchValue] = useState('');

	const [selectMode, setSelectMode] = useState(formValues.generalConfiguration?.selectMode || 'select_all');

	const [selectedRmIds, setSelectedRmIds] = useState([]);

	const [selectedAgentIds, setSelectedAgentIds] = useState(formValues.generalConfiguration?.user_ids || []);

	const [params, setParams] = useState({
		page       : 1,
		page_limit : 10,
		filters    : {
			role_ids             : watchRoles.map((role) => role.split('_')?.[GLOBAL_CONSTANTS.zeroth_index]),
			status               : 'active',
			q                    : searchQuery || undefined,
			reporting_manager_id : !isEmpty(selectedRmIds) ? selectedRmIds : undefined,
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
				q                    : searchQuery || undefined,
				reporting_manager_id : !isEmpty(selectedRmIds) ? selectedRmIds : undefined,
			},
		}));
	}, [searchQuery, selectedRmIds]);

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
		selectedRmIds,
		setSelectedRmIds,
	};
};

export default useEditApplicableAgents;
