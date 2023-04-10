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
			index   : 0,
			payload : {
				sort_by   : sortBy,
				sort_type : sortType,
				filters   : { test_id, q: query, result_status: filter, is_appeared: true, status: 'active' },
				...params,
			},
			title: 'Appeared',
		},
		ongoing: {
			index   : 1,
			payload : {
				sort_by   : sortBy,
				sort_type : sortType,
				filters   : { test_id, q: query, result_status: filter, state: 'ongoing' },
				...params,
			},
			title: 'Ongoing',
		},
		not_appeared: {
			index   : 2,
			payload : {
				filters: { test_id, q: query, is_appeared: false, status: 'active' },
				...params,
			},
			title: 'Not Appeared',
		},
	};

	const { payload } = STUDENTS_MAPPING[activeTab];

	const [{ data, loading }, refetch] = useRequest({
		method : 'GET',
		url    : '/list_admin_student_wise_test_result',
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
