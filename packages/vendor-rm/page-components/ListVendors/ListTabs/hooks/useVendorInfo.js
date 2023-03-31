import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useSelector } from '@cogoport/store';
import { useEffect, useState, useCallback } from 'react';

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
		{ manual: true },
	);

	const getVendorInfo = useCallback(async () => {
		try {
			const params = {
				id: vendor_id,
			};

			const response = await trigger({
				params,
			});

			setData(response);
		} catch (e) {
			Toast.error(getApiErrorString(e?.response?.data));
		}
	}, [trigger, vendor_id]);

	useEffect(() => {
		if (vendor_id) {
			getVendorInfo();
		}
	}, [getVendorInfo, vendor_id]);

	return {
		getVendorLoading,
		data              : data?.data,
		refetchVendorInfo : getVendorInfo,
	};
};

export default useVendorInfo;
