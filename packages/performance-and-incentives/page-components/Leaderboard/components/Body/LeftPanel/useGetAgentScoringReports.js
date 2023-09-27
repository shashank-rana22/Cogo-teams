import { useAllocationRequest } from '@cogoport/request';
import { useState } from 'react';

const useGetScoringReports = (props) => {
	const { params } = props;

	const [searchValue, setSearchValue] = useState('');

	const [levelStack, setLevelStack] = useState([]);
	const [isExpanded, setIsExpanded] = useState(false);

	const [{ data, loading }, refetch] = useAllocationRequest({
		url     : '/reports',
		method  : 'GET',
		authkey : 'get_agent_scoring_reports',
		params,
	}, { manual: false });

	const { list = [], current_user_data: currentUserData } = data || {};

	return {
		loading,
		list,
		searchValue,
		setSearchValue,
		levelStack,
		setLevelStack,
		currentUserData,
		isExpanded,
		setIsExpanded,
		refetch,
	};
};

export default useGetScoringReports;
