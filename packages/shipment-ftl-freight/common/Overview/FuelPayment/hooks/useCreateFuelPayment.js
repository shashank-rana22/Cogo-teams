import { Toast } from '@cogoport/components';
import getApiErrorString from '@cogoport/forms/utils/getApiError';
import { useRequest } from '@cogoport/request';

import { percentageAmount } from '../utils/percentageAmount';

export const MAX_AMOUNT = 10000;
export const ATH_PERCENTAGE = 20;
export const MIN_AMOUNT = 0;

const useCreateFuelPayment = ({ shipment_data = {}, callback = () => {} }) => {
	const [{ loading, data }, trigger] = useRequest({
		url    : '/create_shipment_ftl_freight_fuel_payment',
		method : 'POST',
	}, { manual: true });

	const createFuelPayment = async ({ values = {}, service_id = '', successCallback = () => {} }) => {
		const {
			mobile_number = '',
			vendor = '',
			ath_amount = '',
			input_amount = '',
			card_pin = '',
			remarks = '',
			fuel_amount: fuelAmount = '',
		} = values;

		const athPercentageAmount = percentageAmount(ATH_PERCENTAGE, +ath_amount);

		let finalAmount = Math.min(athPercentageAmount, MAX_AMOUNT, +fuelAmount);
		if (finalAmount === MIN_AMOUNT || +input_amount === MIN_AMOUNT) {
			Toast.error(`Allowed amount cannot be ${MIN_AMOUNT}`);
			return;
		}

		if (+input_amount > finalAmount) {
			Toast.error(
				`Allowed Amount is always between  ${MIN_AMOUNT} and ${finalAmount}, please Change entered amount`,
			);
			return;
		}

		finalAmount = +input_amount;

		try {
			await trigger({
				data: {
					shipment_id      : shipment_data?.id,
					service_id,
					mobile_number,
					virtual_card_pin : card_pin,
					remarks,
					vendor,
					card_limit       : finalAmount,
					card_limit_type  : 'onetimelimit',
				},
			});
			Toast.success('Fuel Payment triggered successfully');
			successCallback();
			callback();
		} catch (error) {
			Toast.error(getApiErrorString(error?.data) || 'Something went wrong!!');
		}
	};

	return {
		loading,
		data,
		createFuelPayment,
	};
};

export default useCreateFuelPayment;
