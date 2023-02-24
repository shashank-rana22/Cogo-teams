import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const months = ['January', 'February', 'March', 'April',
	'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const useManagerListItem = ({ item }) => {
	const d = new Date();

	const [params, setParams] = useState({
		ManagerID : item.manager_id || undefined,
		Page      : 1,
		PageLimit : 10,
		Month     : months[d.getMonth()],
		Year      : d.getFullYear(),
	});

	const [{ data = {}, loading = false }] = useRequest({
		method : 'get',
		url    : 'list_user_feedbacks',
		params,
	}, { manual: false });

	const setPage = (p) => { setParams({ ...params, Page: p }); };

	return { data, loading, setParams, params, setPage };
};

export default useManagerListItem;
