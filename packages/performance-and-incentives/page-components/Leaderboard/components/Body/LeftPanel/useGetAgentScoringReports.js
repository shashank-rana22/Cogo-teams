import { useAllocationRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState } from 'react';

const useGetScoringReports = (props) => {
	const { params } = props;

	const { incentive_leaderboard_viewtype: viewType } = useSelector(({ profile }) => profile);

	const [view] = viewType.split('_');

	const [searchValue, setSearchValue] = useState('');
	const [currLevel, setCurrLevel] = useState([`${view}_report`, '']);
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
		currLevel,
		setCurrLevel,
		levelStack,
		setLevelStack,
		currentUserData,
		isExpanded,
		setIsExpanded,
		refetch,
		view,
	};
};

export default useGetScoringReports;
