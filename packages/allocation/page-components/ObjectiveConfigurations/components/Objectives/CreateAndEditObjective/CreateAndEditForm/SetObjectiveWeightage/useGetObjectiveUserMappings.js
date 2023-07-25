import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

import SELECT_AGENTS_KEYS_MAPPING from '../../../../../constants/select-agents-keys-mapping';

const { SELECT_ONLY, EXCLUDE_ONLY } = SELECT_AGENTS_KEYS_MAPPING;

const useGetObjectiveUserMappings = (props) => {
	const { formValues } = props;

	const { generalConfiguration: { roles = [], selectMode = '', user_ids = [] } = {} } = formValues;

	const [params, setParams] = useState({
		page    : 1,
		filters : {
			role_ids           : roles.map((role) => role.id),
			user_ids           : selectMode === SELECT_ONLY ? user_ids : undefined,
			excluding_user_ids : selectMode === EXCLUDE_ONLY ? user_ids : undefined,
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

// const list = [
// 	{
// 		user: {
// 			id               : 1,
// 			name             : 'Deeshant Rathi',
// 			role_sub_funtion : [],
// 		},
// 		role: {
// 			id   : '23',
// 			name : 'KAM',
// 		},
// 		partner: {
// 			business_name : 'COGO INDIA',
// 			id            : '2',
// 		},
// 		objectives: [
// 			{
// 				id             : '3',
// 				name           : 'Test 1',
// 				objective_type : 'company',
// 				status         : 'verified',
// 			},
// 			{
// 				id             : '4',
// 				name           : 'Test 2',
// 				objective_type : 'team',
// 				status         : 'verified',
// 			},
// 		],
// 	},
// 	{
// 		user: {
// 			id               : 6,
// 			name             : 'Parth Rathi',
// 			role_sub_funtion : [],
// 		},
// 		role: {
// 			id   : '23',
// 			name : 'KAM',
// 		},
// 		partner: {
// 			business_name : 'COGO Vietnam',
// 			id            : '7',
// 		},
// 		objectives: [
// 			// {
// 			// 	id             : '3',
// 			// 	name           : 'Test 1',
// 			// 	objective_type : 'company',
// 			// 	status         : 'verified',
// 			// },
// 		],
// 	},
// ];
