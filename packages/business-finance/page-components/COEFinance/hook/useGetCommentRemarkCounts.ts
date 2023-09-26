import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequestBf } from '@cogoport/request';
import { upperCase, format } from '@cogoport/utils';
import { useCallback } from 'react';

import toastApiError from '../../commons/toastApiError';

const useGetCommentRemarkCounts = (remarkDate) => {
	const [{ data = {} }, trigger] = useRequestBf(
		{
			url     : '/purchase/bills/comment-remark-counts',
			method  : 'get',
			authKey : 'get_purchase_bills_comment_remark_counts',
		},
		{ autoCancel: false },
	);
	const getData = useCallback(async () => {
		const startDate = remarkDate?.startDate
			? format(remarkDate?.startDate, GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd']) : undefined;
		const endDate = format(remarkDate?.endDate, GLOBAL_CONSTANTS.formats.date['yyyy-MM-dd']);

		try {
			await trigger({
				params: {
					rejectedCategory : 'COE_REJECTED',
					toDate           : endDate || new Date(),
					fromDate         : startDate || undefined,
				},
			});
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger, remarkDate]);

	const totalRemarks = (Object.values(data) || []).reduce(((acc, value) => acc + value), 0);

	const pieData = (Object.keys(data) || []).map((item) => (
		{
			id    : upperCase(item),
			label : `${upperCase(item)} : ${data?.[item] || 0}`,
			value : (((data?.[item] || 0) * 100) / totalRemarks).toFixed(2),
		}
	));

	return { getData, pieData };
};

export default useGetCommentRemarkCounts;
