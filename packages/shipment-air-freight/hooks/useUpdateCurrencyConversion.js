import toastApiError from '@cogoport/air-modules/utils/toastApiError';
import { Toast } from '@cogoport/components';
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

	const handleFormSubmit = async (EXCHANGE_CURRENCY_HASH) => {
		try {
			await trigger({
				data: {
					shipment_id,
					updated_currency_conversion_rate: EXCHANGE_CURRENCY_HASH,
				},
			});
			Toast.success(successMessage);
			refetch();
		} catch (err) {
			toastApiError(err);
		}
	};

	return {
		handleFormSubmit,
		loading,
	};
};

export default useUpdateCurrencyConversion;
