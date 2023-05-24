import { useIrisRequest } from '@cogoport/request';
import { useState, useEffect } from 'react';

import monthOptions from '../../../../constants/month-options';

const useManagerListItem = ({ item, searchValue = '', pageParams = {} }) => {
	const d = new Date();
	const { Month, Year } = pageParams;

	const [params, setParams] = useState({
		ManagerID            : item.manager_id || undefined,
		Page                 : 1,
		PageLimit            : 10,
		FeedbackDataRequired : true,
		Month                : Month || monthOptions[d.getMonth() - 1].value,
		Year                 : Year || d.getFullYear(),
	});

	const validParams = {};
	Object.keys(params).forEach((key) => { if (params[key]) { validParams[key] = params[key]; } });

	const [{ data = {}, loading = false }] = useIrisRequest({
		method : 'get',
		url    : 'get_iris_list_reportees',
		params : { ...validParams },
	}, { manual: false });

	const setPage = (p) => { setParams({ ...params, Page: p }); };

	useEffect(() => setParams((pv) => ({ ...pv, Q: searchValue || undefined, Page: 1 })), [searchValue]);

	return { data, loading, setParams, params, setPage };
};

export default useManagerListItem;
