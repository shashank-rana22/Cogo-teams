import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';
import { useState } from 'react';

const useUpdateConvenienceFeeBillingService = ({
	convenienceDetails,
	refetch,
	id = '',
}) => {
	const [value, setValue] = useState('');

	const [{ loading }, trigger] = useRequest({
		url    : '/update_checkout',
		method : 'POST',
	}, { manual: true });

	const handleUpdateBillingService = async ({ selectedValue, setShowPopover }) => {
		try {
			await trigger({
				data: {
					convenience_rate: {
						...convenienceDetails.convenience_rate,
						convenience_fee_billing_service : selectedValue,
						adjust_convenience_fee          : true,
					},
					id,
				},
			});

			setValue(selectedValue);
			setShowPopover(false);
			Toast.success('Updated succesfully');
			refetch();
		} catch (err) {
			Toast.error(getApiErrorString(err.response?.data) || 'something went wrong');
		}
	};

	return {
		handleUpdateBillingService,
		value,
		loading,
	};
};

export default useUpdateConvenienceFeeBillingService;
