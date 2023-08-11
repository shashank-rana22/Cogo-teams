import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

import SELECT_AGENTS_KEYS_MAPPING from '../../../../constants/select-agents-keys-mapping';

const { SELECT_ONLY, EXCLUDE_ONLY } = SELECT_AGENTS_KEYS_MAPPING;

const useGetObjectiveUserMappings = (props) => {
	const { formValues } = props;

	const { generalConfiguration: { roles = [], selectMode = '', user_ids = [] } = {} } = formValues;

	const [params, setParams] = useState({
		page    : 1,
		filters : {
			role_ids        : roles.map((role) => role.id),
			user_id         : selectMode === SELECT_ONLY ? user_ids : undefined,
			except_user_ids : selectMode === EXCLUDE_ONLY ? user_ids : undefined,
		},
	});

	const [{ data, loading }] = useAllocationRequest({
		url     : 'objective_user_mappings',
		method  : 'GET',
		authkey : 'get_allocation_objective_user_mappings',
		params,
	}, { manual: false });

	const { list = [], ...paginationData } = data || {};

	const getNextPage = (nextPage = '') => {
		setParams((previousParams) => ({
			...previousParams,
			page: nextPage,
		}));
	};

	return {
		list,
		listLoading: loading,
		getNextPage,
		paginationData,
	};
};
export default useGetObjectiveUserMappings;