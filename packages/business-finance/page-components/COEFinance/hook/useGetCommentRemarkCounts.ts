import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useRequestBf } from '@cogoport/request';
import { upperCase, format } from '@cogoport/utils';
import { useCallback } from 'react';

import toastApiError from '../../commons/toastApiError';

const REJECTION_CATEGORY_MAPPING = {
	coe_rejected : 'COE_REJECTED',
	coe_on_hold  : 'ON_HOLD',
};

const useGetCommentRemarkCounts = ({ remarkDate, subActiveTabReject = '' }) => {
	const [{ data = {}, loading = false }, trigger] = useRequestBf(
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
					rejectedCategory : REJECTION_CATEGORY_MAPPING[subActiveTabReject],
					toDate           : endDate || new Date(),
					fromDate         : startDate || undefined,
				},
			});
		} catch (err) {
			toastApiError(err);
		}
	}, [trigger, remarkDate, subActiveTabReject]);

	const totalRemarks: any = (Object.values(data) || []).reduce(((acc: number, value:any) => (acc + value)), 0);

	const pieData = (Object.keys(data) || []).map((item) => (
		{
			id    : upperCase(item),
			label : `${upperCase(item)} : ${data?.[item] || 0}`,
			value : (((data?.[item] || 0) * 100) / totalRemarks).toFixed(2),
		}
	));

	return { getData, pieData, loading };
};

export default useGetCommentRemarkCounts;
