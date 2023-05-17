import { useRequest } from '@cogoport/request';
import { useEffect, useCallback } from 'react';

const useGetListCount = () => {
	const [{ data: listCountData }, trigger] = useRequest(
		{
			method : 'get',
			url    : 'list_referral_transactions',
		},
		{ manual: true },
	);

	const listCount = useCallback(async () => {
		try {
			await trigger({

			});
		} catch (error) {
			console.log('error', error);
		}
	}, [trigger]);

	useEffect(() => {
		listCount();
	}, [listCount]);

	return { listCountData };
};

export default useGetListCount;
