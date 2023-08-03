import { useRequest } from '@cogoport/request';
import { useEffect, useState, useCallback } from 'react';

const useGetReferralTransactions = ({ userDate = {} }) => {
	const { id = ''	} = userDate?.referee_data || {};

	const [{ loading: transactionsLoading, data: transactionsData }, trigger] = useRequest(
		{
			method : 'get',
			url    : 'list_referral_transactions',
		},
		{ manual: true },
	);

	const [pagination, setPagination] = useState(1);

	const getRules = useCallback(async () => {
		try {
			await trigger({
				params: {
					page    : pagination,
					filters : {
						beneficiary_id: id,

					},
				},
			});
		} catch (error) {
			console.log('error', error);
		}
	}, [id, pagination, trigger]);

	useEffect(() => {
		getRules();
	}, [getRules]);

	return { transactionsData, transactionsLoading, setPagination };
};

export default useGetReferralTransactions;
