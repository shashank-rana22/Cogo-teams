import { useIrisRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

import monthOptions from '../../../../constants/month-options';

const useManagerListItem = ({ item, searchValue = '', pageParams = {} }) => {
	const d = new Date();
	const { Month, Year } = pageParams;

	const [params, setParams] = useState({
		ManagerID : item.manager_id || undefined,
		Page      : 1,
		PageLimit : 10,
		Month     : Month || monthOptions[d.getMonth() - 1].value,
		Year      : Year || d.getFullYear(),
	});

	const [{ data = {}, loading = false }] = useIrisRequest({
		method : 'get',
		url    : 'get_iris_list_user_feedbacks',
		params,
	}, { manual: false });

	const setPage = (p) => { setParams({ ...params, Page: p }); };

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => setParams({ ...params, Q: searchValue || undefined, Page: 1 }), [searchValue]);

	return { data, loading, setParams, params, setPage };
};

export default useManagerListItem;
