import { Toast } from '@cogoport/components';
import { useDebounceQuery } from '@cogoport/forms';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useHarbourRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetListIrregularPayments = (page = 1) => {
	const [{ loading, data }, trigger] = useHarbourRequest({
		method : 'GET',
		url    : '/list_all_irregular_payments',
	}, { manual: true });

	const { query = '', debounceQuery } = useDebounceQuery();

	const getListIrregularPayments = useCallback(
		() => {
			trigger({
				params: {
					filters: {
						q: query,
					},
					page,
				},
			});
		},
		[query, trigger, page],
	);

	useEffect(() => {
		try {
			getListIrregularPayments();
		} catch (error) {
			Toast.error(getApiErrorString(error?.response?.data) || 'Something went wrong');
		}
	}, [getListIrregularPayments]);

	return { loading, data, debounceQuery };
};

export default useGetListIrregularPayments;
