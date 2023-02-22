import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useListFeedbackQuestions = ({
	formId = '',
	searchValue = '',
}) => {
	const [params, setParams] = useState({
		FormID  : formId || undefined,
		filters : {
		},
		page       : 1,
		page_limit : 20,
	});

	const [{ data = {}, loading = false }, trigger] = useRequest({
		method : 'get',
		url    : 'list-questions',
		params,
	}, { manual: false });

	const setPage = (p) => { setParams({ ...params, page: p }); };

	useEffect(() => {
		setParams({ ...params, Filters: { ...(params.Filters || {}), q: searchValue || undefined }, page: 1 });
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
