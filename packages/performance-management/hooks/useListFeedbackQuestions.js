import { useIrisRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useListFeedbackQuestions = ({
	formId = '',
	searchValue = '',
}) => {
	const [params, setParams] = useState({
		FormID    : formId || undefined,
		Page      : 1,
		PageLimit : 20,
	});

	const [{ data = {}, loading = false }, trigger] = useIrisRequest({
		method : 'get',
		url    : 'get_iris_list_questions',
		params,
	}, { manual: false });

	const setPage = (p) => { setParams({ ...params, Page: p }); };

	useEffect(() => {
		setParams({ ...params, Q: searchValue || undefined, Page: 1 });
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue]);

	return {
		loading,
		trigger,
		data,
		params,
		setParams,
		setPage,
	};
};

export default useListFeedbackQuestions;
