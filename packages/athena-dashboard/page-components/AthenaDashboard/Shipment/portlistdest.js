import { useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

function useGetportsdest() {
	const [ansdest, setAnsdest] = useState([]);
	const [pgdest, setPgdest] = useState(1);
	const [{ loading = false, data: responseData = {} }] = useRequest({
		url    : 'list_locations',
		method : 'get',
		params : { filters: { type: ['seaport', 'airport'] }, page: pgdest || 1 },
	}, { manual: false });
	useEffect(() => {
		if (!isEmpty(responseData)) {
			setAnsdest(responseData);
		}
	}, [responseData]);
	return { ansdest, pgdest, setPgdest };
}
export default useGetportsdest;
