import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useCallback, useEffect, useState } from 'react';

function useGetHandlingFee({ id = '' }) {
	const [listType, setListType] = useState('active');

	const [{ data, loading = false }, trigger] = useRequest({
		url    : '/get_handling_fee_configuration',
		method : 'GET',
		params : {
			id,
			status: listType,
		},
	}, { manual: true });

	const refetchGetHandlingFeeData = useCallback(async () => {
		try {
			await trigger({
				params: {
					id,
					status: listType,
				},
			});
		} catch (error) {
			if (error?.response) {
				Toast.error(getApiErrorString(error?.response?.data));
			}
		}
	}, [id, listType, trigger]);

	useEffect(() => {
		if (id) {
			refetchGetHandlingFeeData();
		}
	}, [listType, refetchGetHandlingFeeData, id]);

	return {
		data,
		loading,
		refetchGetHandlingFeeData,
		listType,
		setListType,
	};
}

export default useGetHandlingFee;
