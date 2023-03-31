import { useRequest } from '@cogoport/request';

const useListVendors = () => {
	const [{ loading, data }, trigger] = useRequest(
		{
			url    : '/list_vendors',
			method : 'get',
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
