import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const useListUserFeedbacks = ({
	searchValue = '',
	month = '', year = '',
	userId = '',
}) => {
	const [params, setParams] = useState({
<<<<<<< HEAD
		Month : month || undefined,
		Year  : year || undefined,
		Page  : 1,
=======
		UserID : userId || undefined,
		Month  : month || undefined,
		Year   : year || undefined,
		Page   : 1,
>>>>>>> b91811a484340f193087a18d4ab15f1100432f46
	});

	const [{ data: feedbackData = {}, loading = false }] = useRequest({
		method : 'get',
		url    : 'list-user-feedbacks',
		params,
	}, { manual: false });

	const setPage = (p) => { setParams({ ...params, Page: p }); };

	useEffect(() => {
		setParams({
			...params,
<<<<<<< HEAD
			Q    : searchValue || undefined,
			Page : 1,
=======
			Page: 1,
>>>>>>> b91811a484340f193087a18d4ab15f1100432f46
		});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue]);

	return {
		params,
		setParams,
		feedbackData,
		loading,
		setPage,
	};
};

export default useListUserFeedbacks;
