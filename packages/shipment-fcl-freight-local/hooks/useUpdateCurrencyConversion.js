import { Toast } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { getApiError } from '@cogoport/forms';
import { useRequest } from '@cogoport/request';
import { useContext } from 'react';

const INITIAL_STATE = 0;

const useUpdateCurrencyConversion = ({
	refetch = () => {}, setOpen = () => {},
	successMessage = 'Rate Added Successfully!',
}) => {
	const { shipment_data } = useContext(ShipmentDetailContext);

	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_currency_conversion',
		method : 'POST',
	});

	const handleFormSubmit = async (value) => {
		const exchangeCurrencyHash = {};
		const currencyData = value;

		Object.keys(value || {}).forEach((val) => {
			const key = `${currencyData[val]?.[INITIAL_STATE]?.from_currency}_${currencyData?.[val]?.[INITIAL_STATE]
				?.to_currency}`;
			if (currencyData?.[val]?.[INITIAL_STATE]?.exchange_rate) {
				exchangeCurrencyHash[key] = Number(
					currencyData?.[val]?.[INITIAL_STATE]?.exchange_rate,
				);
			}
		});
		if (Object.keys(exchangeCurrencyHash).length === INITIAL_STATE) {
			Toast.error('Please fill atleast one field !');
			return;
		}

		try {
			await trigger({
				data: {
					shipment_id                      : shipment_data.id,
					updated_currency_conversion_rate : exchangeCurrencyHash,
				},
			});
			Toast.success(successMessage);
			refetch();
			setOpen(false);
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
