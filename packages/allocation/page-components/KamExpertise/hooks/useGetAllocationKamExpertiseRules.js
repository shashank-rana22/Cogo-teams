import { useAllocationRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

function useGetAllocationKamExpertiseRules() {
	const [ruleType, setRuleType] = useState('');
	const [params, setParams] = useState({
		filters: {
			status    : 'active',
			rule_type : ruleType || undefined,
		},
	});

	const [{ loading, data = {} }, refetch] = useAllocationRequest({
		method  : 'get',
		url     : '/kam_expertise_rules',
		authkey : 'get_allocation_kam_expertise_rules',
		params,
	});

	useEffect(() => {
		setParams((previousParams) => ({
			...previousParams,
			filters: {
				...previousParams.filters,
				rule_type: ruleType || undefined,
			},
		}));
	}, [ruleType]);

	return {
		attributeList: data.list || [],
		loading,
		refetch,
		setRuleType,
	};
}

export default useGetAllocationKamExpertiseRules;
