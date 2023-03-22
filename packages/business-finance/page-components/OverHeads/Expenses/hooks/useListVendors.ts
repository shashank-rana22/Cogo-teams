/* eslint-disable consistent-return */
import { useRequest } from '@cogoport/request';

interface Props {
	checkCombination?:boolean,
	nonRecurringData?:object,
	timeline?:string[],
	active?:any,
	setActive?:(p:any)=>void,
}

const useListVendors = () => {
	const [{ loading, data }, trigger] = useRequest(
		{
			url    : '/list_vendors',
			method : 'get',
		},
		{ manual: true },
	);

	const listVendorApi = async ({
		checkCombination, timeline = [], active = '',
		setActive = () => {},
	}:Props) => {
		// const { vendorName, expenseCategory, expenseSubCategory } = nonRecurringData || {};

		try {
			if (checkCombination) {
				// THIS IS TO CHECK THE COMBINATION OF THE INPUT VALUES CORRESPONDING TO VENDOR DATA

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
					const current = timeline?.indexOf(active);
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
		vendorList: data,
	};
};

export default useListVendors;
