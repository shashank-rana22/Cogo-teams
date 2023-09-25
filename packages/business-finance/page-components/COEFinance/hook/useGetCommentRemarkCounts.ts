import { useRequestBf } from '@cogoport/request';
import { upperCase } from '@cogoport/utils';
import { useCallback } from 'react';

import toastApiError from '../../commons/toastApiError';

const useGetCommentRemarkCounts = () => {
	const [{ data = {} }, trigger] = useRequestBf(
		{
			url     : '/purchase/bills/comment-remark-counts',
			method  : 'get',
			authKey : 'get_purchase_bills_comment_remark_counts',
		},
		{ autoCancel: false },
	);
	const getData = useCallback(async () => {
		try {
			await trigger();
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger]);

	const pieData = (Object.keys(data) || []).map((item) => (
		{
			id    : upperCase(item),
			label : `${upperCase(item)} : ${data?.[item] || 0}`,
			value : data?.[item] || 0,
		}
	));

	return { getData, pieData };
};

export default useGetCommentRemarkCounts;
