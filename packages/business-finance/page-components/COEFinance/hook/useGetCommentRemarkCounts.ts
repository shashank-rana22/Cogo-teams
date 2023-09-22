import { useRequestBf } from '@cogoport/request';
import { useEffect } from 'react';

import toastApiError from '../../commons/toastApiError';

interface FilterInterface {
	serviceType?:string
	timePeriod?:string
	dateRange?:DateInterface
	rest?:any
}

interface DateInterface {
	startDate?:Date
	endDate?:Date
}

const useGetCommentRemarkCounts = (filters :FilterInterface) => {
	const [{ data:pieData, loading }, trigger] = useRequestBf(
		{
			url     : '/purchase/bills/comment-remark-counts',
			method  : 'get',
			authKey : 'get_purchase_bills_comment_remarks_counts',
		},
		{ autoCancel: false },
	);

	const getData = async () => {
		try {
			await trigger();
		} catch (err) {
			toastApiError(err);
		}
	};

	useEffect(() => {
		getData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filters]);

	return { pieData, loading };
};

export default useGetCommentRemarkCounts;
