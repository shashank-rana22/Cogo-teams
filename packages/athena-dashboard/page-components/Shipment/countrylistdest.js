import { useAthenaRequest, useRequest } from '@cogoport/request';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

function useGetCountrylistdest() {
	const [paramsdest, setParamsdest] = useState([]);
	const [paginationdest, setPaginationdest] = useState(1);

	const [{ loading = false, data: responseData = {} }] = useRequest({
		url    : 'list_locations',
		method : 'get',
		params : { filters: { type: ['country'] }, page: paginationdest || 1 },
	}, { manual: false });

	useEffect(() => {
		if (!isEmpty(responseData)) {
			setParamsdest(responseData);
		}
	}, [responseData]);
	return { paramsdest, paginationdest, setPaginationdest };
}
export default useGetCountrylistdest;
