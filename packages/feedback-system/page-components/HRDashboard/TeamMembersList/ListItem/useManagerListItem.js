import { useRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

const months = ['January', 'February', 'March', 'April',
	'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const useManagerListItem = ({ item, searchValue = '', pageParams = {} }) => {
	const d = new Date();
	const { Month, Year } = pageParams;

	const [params, setParams] = useState({
		ManagerID : item.manager_id || undefined,
		Page      : 1,
		PageLimit : 10,
		Month     : Month || months[d.getMonth() - 1],
		Year      : Year || d.getFullYear(),
	});

	const [{ data = {}, loading = false }] = useRequest({
		method : 'get',
		url    : 'list_user_feedbacks',
		params,
	}, { manual: false });

	const setPage = (p) => { setParams({ ...params, Page: p }); };

	useEffect(() => setParams({ ...params, Q: searchValue || undefined }), [searchValue]);

	return { data, loading, setParams, params, setPage };
};

export default useManagerListItem;
