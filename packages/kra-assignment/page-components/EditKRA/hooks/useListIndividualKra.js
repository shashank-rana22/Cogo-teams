import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useCallback, useEffect } from 'react';

function useListIndividualKra() {
	const { profile = {} } = useSelector((state) => state);

	const { user = {} } = profile;

	const { id:user_id } = user;

	const [{ data, loading }, trigger] = useRequest(
		{
			url    : '/list_individual_kra',
			method : 'GET',
		},
		{ manual: true },
	);

	const listIndividualKra = useCallback(async () => {
		try {
			await trigger({
				params: {
					manager_user_id: 'cb6b0ef5-3a79-4a6f-a2a4-ea8f6908dfa4' || user_id,
				},
			});
		} catch (error) {
			if (error?.response?.data) {
				Toast.error(
					getApiErrorString(error?.response?.data) || 'Something went wrong',
				);
			}
		}
	}, [trigger, user_id]);

	useEffect(() => {
		listIndividualKra();
	}, [listIndividualKra]);

	return {
		data: data?.list,
		loading,
		listIndividualKra,
	};
}

export default useListIndividualKra;
