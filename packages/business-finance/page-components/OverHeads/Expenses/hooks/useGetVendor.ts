import { useRequest } from '@cogoport/request';
import { useEffect } from 'react';

const useGetVendor = (vendorId:string | number) => {
	const [{ loading, data }, trigger] = useRequest(
		{
			url    : '/list_vendors',
			method : 'get',
		},
		{ manual: true },
	);

	useEffect(() => {
		const listVendorApi = async () => {
			try {
				await trigger({
					params: {
						filters: {
							id: vendorId || undefined,
						},
					},
				});
			} catch (err) {
				console.log(err);
			}
		};
		listVendorApi();
	}, [trigger, vendorId]);

	return {
		loading,
		vendorList: data?.list,
	};
};

export default useGetVendor;
