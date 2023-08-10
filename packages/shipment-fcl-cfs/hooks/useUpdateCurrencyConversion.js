import { Toast } from '@cogoport/components';
import { getApiError } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';

const useUpdateCurrencyConversion = ({
	shipment_id = '',
	refetch = () => {},
	successMessage = 'Rate Added Successfully!',
}) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_currency_conversion',
		method : 'POST',
	}, { manual: true });

	const handleFormSubmit = async (exchangeCurrencyHash) => {
		try {
			await trigger({
				data: {
					shipment_id,
					updated_currency_conversion_rate: exchangeCurrencyHash,
				},
			});
			Toast.success(successMessage);
			refetch();
		} catch (err) {
			Toast.error(getApiError(err?.response?.data));
		}
	};

	return {
		handleFormSubmit,
		loading,
	};
};

export default useUpdateCurrencyConversion;
