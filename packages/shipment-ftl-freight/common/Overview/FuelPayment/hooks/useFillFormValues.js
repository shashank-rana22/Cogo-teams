import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useEffect, useCallback } from 'react';

import { percentageAmount } from '../utils/percentageAmount';

import { MAX_AMOUNT, ATH_PERCENTAGE, MIN_AMOUNT } from './useCreateFuelPayment';

const DEFAULT_SPLIT_TYPE = 'fuel';

const useFillformValues = ({
	collectionPartiesData = {},
	service = {},
	dataGetFuelPayment = {},
	setValue = () => {},
	formValues = {},
	setShowModal = () => {},
}) => {
	const collectionPartyList = collectionPartiesData?.list;

	const collectionParty = (collectionPartyList || []).find(
		(singleItem) => singleItem?.service_provider_id === service?.service_provider_id,
	);

	const athAmount = (collectionParty?.service_charges || []).find(
		(singleItem) => singleItem?.service_id === service?.id,
	);

	const fuelAthAmount = (athAmount?.split_advance_amount || []).find(
		(singleItem) => singleItem?.split_type === DEFAULT_SPLIT_TYPE,
	);

	const fuelPaymentList = dataGetFuelPayment?.list || [];

	const fuelPaymentItem =	fuelPaymentList.find((singleItem) => singleItem?.service_id === service?.id)
		|| {};

	const disableButton = Object.values(formValues).some((singleItem) => isEmpty(singleItem));

	const submitForm = () => {
		const athPercentageAmount = percentageAmount(
			ATH_PERCENTAGE,
			+formValues.ath_amount,
		);

		const finalAmount = Math.min(
			athPercentageAmount,
			MAX_AMOUNT,
			+formValues.fuel_amount,
		);

		if (finalAmount === MIN_AMOUNT || +formValues.input_amount === MIN_AMOUNT) {
			Toast.error(`Allowed amount cannot be ${MIN_AMOUNT}`);
			return;
		}

		if (+formValues.input_amount > finalAmount) {
			Toast.error(
				`Allowed Amount is always between ${MIN_AMOUNT} and ${finalAmount}, please Change entered amount`,
			);
			return;
		}
		setShowModal(true);
	};

	const setFormValues = useCallback(
		() => {
			const prefillDataObj = {
				truck_number  : service?.truck_number,
				mobile_number : service?.driver_details?.contact,
				ath_amount    : athAmount?.advance_amount,
				fuel_amount   : fuelAthAmount?.amount,
			};

			Object.entries(prefillDataObj).forEach(([key, value]) => {
				setValue(key, value);
			});
		},
		[athAmount, fuelAthAmount, service, setValue],
	);

	useEffect(() => {
		setFormValues();
	}, [setFormValues]);

	return {
		fuelAthAmount,
		fuelPaymentItem,
		disableButton,
		submitForm,
	};
};

export default useFillformValues;
