import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useState, useCallback, useMemo, useEffect } from 'react';

const MAPPING = {
	ongoing   : { state: 'ongoing' },
	mandatory : { is_mandatory: true },
	completed : { state: 'completed' },
	saved     : { is_saved: true },
};

function useListCourseUserMappings({ activeTab }) {
	const { user:{ id: user_id } } = useSelector((state) => state.profile);

	const { query, debounceQuery } = useDebounceQuery();

	const [input, setInput] = useState('');
	const [params, setParams] = useState({
		page    : 1,
		filters : {
			status: 'active',
			user_id,
		},
	});

	const finalPayload = useMemo(() => ({
		...params,
		filters: {
			...params.filters,
			// ...MAPPING[activeTab],
			q: query,
		},
	}), [activeTab, params, query]);

	const [{ data = {}, loading }, trigger] = useRequest({
		url    : '/list_user_courses',
		method : 'GET',
		params : finalPayload,
	}, { manual: false });

	const fetchList = useCallback(() => {
		try {
			trigger({
				params: finalPayload,
			});
		} catch (error) {
			Toast.error(error.message);
		}
	}, [trigger, finalPayload]);

	useEffect(() => {
		fetchList();
	}, [activeTab, fetchList]);

	return {
		data,
		loading,
		fetchList,
		setParams,
		input,
		setInput,
		params,
		debounceQuery,
	};
}

export default useListCourseUserMappings;
