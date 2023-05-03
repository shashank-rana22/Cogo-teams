import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useStudentWiseTestResult = ({ test_id = '', activeAttempt = '' }) => {
	const [{ loading: reAttemptLoading }, trigger] = useRequest({
		method : 'post',
		url    : '/update_test_mapping_responses',
	}, { manual: true });

	const [showReAttemptModal, setShowReAttemptModal] = useState(false);

	const [activeTab, setActiveTab] = useState('appeared');

	const [params, setParams] = useState({});

	const [filter, setFilter] = useState('');

	const [sortFilter, setSortFilter] = useState({});

	const [searchValue, setSearchValue] = useState('');

	const { debounceQuery, query } = useDebounceQuery();

	const { sortBy, sortType } = sortFilter || {};

	const STUDENTS_MAPPING = {
		appeared: {
			payload: {
				sort_by   : sortBy,
				sort_type : sortType,
				filters   : {
					test_id,
					q             : query,
					result_status : filter,
					is_appeared   : true,
					status        : activeAttempt === 'attempt_1' ? 'active' : 'retest',
				},
				...params,
			},
			title: 'Appeared',
		},
		ongoing: {
			payload: {
				sort_by   : sortBy,
				sort_type : sortType,
				filters   : {
					test_id,
					q             : query,
					result_status : filter,
					state         : 'ongoing',
					status        : activeAttempt === 'attempt_1' ? 'active' : 'retest',
				},
				...params,
			},
			title: 'Ongoing',
		},
		not_appeared: {
			payload: {
				filters: {
					test_id,
					q           : query,
					is_appeared : false,
					status      : activeAttempt === 'attempt_1' ? 'active' : 'retest',
				},
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

	const handleReAttempt = async () => {
		try {
			await trigger({
				data: {
					user_id: showReAttemptModal?.id,
					test_id,
				},
			});

			refetch();
		} catch (err) {
			Toast.error(getApiErrorString(err?.response?.data));
		}
	};

	return {
		data,
		loading,
		refetch,
		reAttemptLoading,
		showReAttemptModal,
		setShowReAttemptModal,
		activeTab,
		sortFilter,
		setSortFilter,
		debounceQuery,
		setActiveTab,
		filter,
		handleReAttempt,
		setFilter,
		setSearchValue,
		searchValue,
		params,
		setParams,
		STUDENTS_MAPPING,
	};
};
export default useStudentWiseTestResult;
