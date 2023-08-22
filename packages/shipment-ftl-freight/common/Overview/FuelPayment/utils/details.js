import { ATH_PERCENTAGE, MAX_AMOUNT } from '../hooks/useCreateFuelPayment';

import { percentageAmount } from './percentageAmount';

const DEFAULT_AMOUNT = 0;

export const details = ({ service, formValues }) => [
	{
		key   : 'mobile_number',
		label : 'Mobile Number',
		value : service?.driver_details?.contact,
	},
	{
		key   : 'input_amount',
		label : 'Input Amount',
		value : formValues?.input_amount,
	},
	{
		label : 'Max Allowed Amount',
		key   : 'max_allowed_amount',
		value : Math.min(
			percentageAmount(ATH_PERCENTAGE, +(formValues?.ath_amount || DEFAULT_AMOUNT)),
			+(formValues?.fuel_amount || DEFAULT_AMOUNT),
			MAX_AMOUNT,
		),
	},
];
