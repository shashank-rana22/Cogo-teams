import { useRequestBf } from '@cogoport/request';
import { upperCase } from '@cogoport/utils';
import { useEffect } from 'react';

import toastApiError from '../../commons/toastApiError';

// interface DateInterface {
// 	startDate?:Date
// 	endDate?:Date
// }

// interface FilterInterface {
// 	serviceType?:string
// 	timePeriod?:string
// 	dateRange?:DateInterface
// 	rest?:any
// }

const useGetCommentRemarkCounts = () => {
	const PIE_CHART_DATA = {
		billingRemarksStat         : 2019,
		collectionPartyRemarksStat : 2337,
		invoiceDetailsRemarksStat  : 2514,
		lineItemsRemarksStat       : 1499,
		taggingRemarksStat         : 14,
		miscellaneousRemarksStat   : 0,
		documentNumberRemarksStat  : 0,
		profitabilityRemarksStat   : 0,

	};
	const [{ data, loading }, trigger] = useRequestBf(
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
	// console.log(pieChartData, 'pieChartData');
	// console.log(Object.keys(pieChartData), 'hell');

	const pieData = (Object.keys(PIE_CHART_DATA) || []).map((item) => (
		{
			id    : item,
			label : `${upperCase(item)} : ${PIE_CHART_DATA?.[item] || 0}`,
			value : PIE_CHART_DATA?.[item] || 0,
		}
	));

	// console.log(pieData, 'pieData');

	useEffect(() => {
		getData();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { data, loading, pieData };
};

export default useGetCommentRemarkCounts;
