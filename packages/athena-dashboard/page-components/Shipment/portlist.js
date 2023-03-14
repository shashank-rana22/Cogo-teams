import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

function useGetports() {
	const [ans, setAns] = useState([]);
	const [pg, setPg] = useState(1);
	const [{ loading = false, data: responseData = {} }] = useRequest({
		url    : 'list_locations',
		method : 'get',
		params : { filters: { type: ['seaport', 'airport'] }, page: pg || 1 },
	}, { manual: false });
	useEffect(() => {
		if (!isEmpty(responseData)) {
			setAns(responseData);
		}
	}, [responseData]);
	return { ans, pg, setPg };
}
export default useGetports;
