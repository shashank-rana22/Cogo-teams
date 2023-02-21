import { useRequest } from '@cogoport/request';
import { useEffect, useState } from 'react';

const useVendorInfo = () => {
	const [data, setData] = useState({});

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
				id: 'af64d717-04b6-4b3c-b440-27dc690ee8b9',
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

	return (
		getVendorLoading,
		data
	);
};

export default useVendorInfo;
