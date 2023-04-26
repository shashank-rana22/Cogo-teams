import { useRequestBf } from '@cogoport/request';

const useListVendors = () => {
	const [{ loading, data }, trigger] = useRequestBf(
		{
			url     : '/list_vendors',
			method  : 'get',
			authKey : 'get_purchase_expense_list_vendors',
		},
		{ manual: true },
	);

	const listVendorApi = async () => {
		try {
			await trigger();
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
