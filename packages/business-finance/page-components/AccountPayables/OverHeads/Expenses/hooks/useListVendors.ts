/* eslint-disable consistent-return */
import { useRequest } from '@cogoport/request';

const useListVendors = () => {
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/list_vendors',
			method : 'get',
		},
		{ manual: true },
	);

	const listVendorApi = async ({ checkCombination, nonRecurringData, timeline, active, setActive }) => {
		console.log('nonRecurringData->', nonRecurringData);

		// const { vendorName, expenseCategory, expenseSubCategory } = nonRecurringData;

		try {
			if (checkCombination) {
				// const value = await trigger({
				// 	params: {
				// 		filters: {
				// 			q            : vendorName,
				// 			category     : expenseCategory,
				// 			sub_category : expenseSubCategory,
				// 		},
				// 	},
				// });

				// if (value?.data?.list?.length > 0) {  --condition check
				// 	const current = timeline.indexOf(active);
				// 	if (current < timeline.length - 1) { setActive(timeline[current + 1]); }
				// } else {
				// 	Toast.error('Please select the valid combination');
				// }

				// ============/
				if (true) {
					const current = timeline.indexOf(active);
					if (current < timeline.length - 1) { setActive(timeline[current + 1]); }
				}
				// ============/
			} else {
				await trigger();
			}
		} catch (err) {
			console.log(err);
		}
	};

	return {
		listVendorApi,
		loading,
	};
};

export default useListVendors;
