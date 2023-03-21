import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

function useGetTestQuestionSets() {
	const [{ data = {}, loading }, trigger] = useRequest({
		url    : 'list_test_question_sets',
		method : 'GET',
	}, { manual: true });

	const [params, setParams] = useState({
		page    : 1,
		filters : {
			status : 'active',
			q      : '',
		},
	});

	const fetchList = () => {
		try {
			trigger({
				params,
			});
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchList();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [params]);

	return {
		data,
		loading,
		fetchList,
		setParams,
		params,
	};
}

export default useGetTestQuestionSets;
