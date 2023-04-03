import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useState, useEffect, useCallback } from 'react';

function useListFeedbacks() {
	const [singleSelected, setSingleSelected] = useState('all');

	const [{ data, loading }, trigger] = useRequest({
		method : 'get',
		url    : '/list_feedbacks',
	}, { manual: false });

	const fetchListFeedbacks = useCallback(async () => {
		try {
			const params = {
				singleSelected,
			};

			await trigger({ params });
		} catch (error) {
			console.log(getApiErrorString(error?.response?.data));
		}
	}, [singleSelected, trigger]);

	const options = [
		{
			key      : '1',
			disabled : false,
			children : 'Cogoport',
			suffix   : null,
			tooltip  : false,
		},
		{
			key      : '3',
			disabled : false,
			children : 'Cogoport Shipments',
			suffix   : null,
			tooltip  : false,
		},
		{
			key      : '4',
			disabled : false,
			children : 'Cogoport Shipments',
			suffix   : null,
			tooltip  : false,
		},
		{
			key      : '5',
			disabled : false,
			children : 'Cogoport Shipments',
			suffix   : null,
			tooltip  : false,
		},
	];

	useEffect(() => {
		fetchListFeedbacks();
	}, [fetchListFeedbacks, singleSelected]);

	return {
		data,
		loading,
		singleSelected,
		setSingleSelected,
		options,
	};
}

export default useListFeedbacks;
