import { useAthenaRequest, useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

function useGetCountrylist() {
	const [params, setParams] = useState([]);
	const [pagination, setPagination] = useState(1);

	const [{ loading = false, data: responseData = {} }] = useRequest({
		url    : 'list_locations',
		method : 'get',
		params : { filters: { type: ['country'] }, page: pagination || 1 },
	}, { manual: false });

	useEffect(() => {
		if (!isEmpty(responseData)) {
			setParams(responseData);
		}
	}, [responseData]);
	return { params, pagination, setPagination };
}
export default useGetCountrylist;
