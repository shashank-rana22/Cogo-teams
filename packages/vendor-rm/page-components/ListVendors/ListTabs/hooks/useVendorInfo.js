import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState } from 'react';

const useVendorInfo = () => {
	const [data, setData] = useState({});

	const {
		general: { query },
	} = useSelector((state) => state);

	const { vendor_id = '' } = query;

	const [{ loading: getVendorLoading }, trigger] = useRequest(
		{
			url    : '/get_vendor',
			method : 'get',
		},
		{ manual: false },
	);

	const VendorInfo = async () => {
		try {
			const params = {
				id: vendor_id,
			};

			const response = await trigger({
				params,
			});

			setData(response);
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		VendorInfo();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const refetchVendorInfo = () => {
		VendorInfo();
	};

	return {
		getVendorLoading,
		data: data?.data,
		refetchVendorInfo,
	};
};

export default useVendorInfo;
