import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useStudentWiseTestResult = ({ test_id = '' }) => {
	const [activeTab, setActiveTab] = useState('appeared');

	const [params, setParams] = useState({});
	const [filter, setFilter] = useState('');
	const [sortFilter, setSortFilter] = useState({});
	const [searchValue, setSearchValue] = useState('');

	const { debounceQuery, query } = useDebounceQuery();

	const { sortBy, sortType } = sortFilter || {};

	const STUDENTS_MAPPING = {
		appeared: {
			url     : '/list_admin_student_wise_test_result',
			payload : {
				test_id,
				sort_by     : sortBy,
				sort_type   : sortType,
				filters     : { final_result: filter },
				search_term : query,
				...params,
			},
			title: 'Appeared',
		},
		not_appeared: {
			url     : '/list_not_appeared_users',
			payload : {
				test_id,
				filter: { q: query },
			},
			title: 'Not Appeared',
		},
	};

	const { payload, url: api_url = '' } = STUDENTS_MAPPING[activeTab];

	const [{ data, loading }, refetch] = useRequest({
		method : 'GET',
		url    : api_url,
		params : { ...payload },
	}, { manual: false });

	return {
		data,
		loading,
		refetch,
		activeTab,
		sortFilter,
		setSortFilter,
		debounceQuery,
		setActiveTab,
		filter,
		setFilter,
		setSearchValue,
		searchValue,
		params,
		setParams,
		STUDENTS_MAPPING,
	};
};
export default useStudentWiseTestResult;
