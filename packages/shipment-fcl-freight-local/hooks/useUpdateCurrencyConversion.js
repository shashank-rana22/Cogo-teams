import { Toast } from '@cogoport/components';
import { ShipmentDetailContext } from '@cogoport/context';
import { useRequest } from '@cogoport/request';
import { useContext } from 'react';

const useUpdateCurrencyConversion = ({ refetch = () => {}, setOpen = () => {} }) => {
	const { shipment_data } = useContext(ShipmentDetailContext);

	const [{ loading }, trigger] = useRequest({
		url    : '/update_shipment_currency_conversion',
		method : 'POST',
	});

	const handleFormSubmit = async (value) => {
		const exchangeCurrencyHash = {};
		const currencyData = value;

		Object.keys(value || {}).forEach((val) => {
			const key = `${currencyData[val]?.[0]?.from_currency}_${currencyData?.[val]?.[0]?.to_currency}`;
			if (currencyData?.[val]?.[0]?.exchange_rate) {
				exchangeCurrencyHash[key] = Number(
					currencyData?.[val]?.[0]?.exchange_rate,
				);
			}
		});
		if (Object.keys(exchangeCurrencyHash).length === 0) {
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
			Toast.success('Rate Added Successfully!');
			refetch();
			setOpen(false);
		} catch (err) {
			console.log(err);
		}
	};

	return {
		handleFormSubmit,
		loading,
	};
};

export default useUpdateCurrencyConversion;
