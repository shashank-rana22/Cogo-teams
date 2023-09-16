import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Layout } from '@cogoport/ocean-modules';
import UNIT_TO_PREFILL_VALUE_MAPPING from '@cogoport/ocean-modules/constants/UNIT_TO_PREFILL_VALUE_MAPPING';
import { useEffect } from 'react';

import getDefaultValues from '../../../utils/get-default-values';
import getControls from '../helper/getControls';

import styles from './styles.module.css';

const QUANTITY_ONE = 1;
const PRICE_ZERO = 0;
const QUANTITY_ZERO = 0;
const STEP_TWO = 2;

function Rate({ data = {}, setStep = () => {}, servicesList = [], task = {}, formattedRate = {} }) {
	const subsidiaryService = (servicesList || []).find((service) => service.service_type === 'subsidiary_service'
		&& service.id === task?.service_id);

	const requiredRawControls = getControls({
		service_type: task?.service_type,
		servicesList,
		subsidiaryService,
	});

	const requiredControls = requiredRawControls.map((ctrl) => ({
		...ctrl,
		value: formattedRate?.[formattedRate?.primary_service?.id]?.[ctrl.name] || ctrl.value,
	}));

	const spDefaultValues = getDefaultValues(requiredControls) || {};

	const { finalControls, defaultValues = {}, onSubmit = () => {} } = data || {};

	const formProps = useForm({ defaultValues: { ...defaultValues, ...spDefaultValues } });
	const { control, handleSubmit, formState:{ errors = {} } = {}, watch, setValue } = formProps || {};

	const { service_charges_with_trade = [] } = data;

	const CUSTOM_VALUES = {};
	const formValues = watch();

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			const [service_id, index, unit] = name.split('.');
			if (unit === 'unit') {
				const finalValue = value[service_id]?.map((val, idx) => {
					if (idx === +index) {
						const { service_detail = [] } = (service_charges_with_trade || [])
							.find((element) => element.service_id === service_id);
						const prefillKey = UNIT_TO_PREFILL_VALUE_MAPPING?.[val?.unit];
						let prefillValue = service_detail[GLOBAL_CONSTANTS.zeroth_index]?.[prefillKey]
						|| (val?.unit === 'per_shipment' ? QUANTITY_ONE : '');
						if (val?.unit === 'per_container') {
							prefillValue = QUANTITY_ONE;
						}
						return {
							...val,
							quantity: prefillValue,
						};
					}
					return val;
				});
				setValue(service_id, finalValue);
			}
		});
		return () => subscription.unsubscribe();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watch]);

	const prepareFormValues = () => {
		const allFormValues = { ...(formValues || {}) };

		(Object.keys(formValues || {}) || [])?.forEach((key) => {
			if (key && formValues[key] && typeof allFormValues[key] !== 'string') {
				allFormValues[key] = (allFormValues[key] || [])?.map((value) => ({
					...value,
					total    : (value.price || PRICE_ZERO) * (value.quantity || QUANTITY_ZERO),
					currency : 'INR',
				}));
			}
		});

		return allFormValues;
	};

	const newFormValues = prepareFormValues();

	Object.keys(formValues).forEach((key) => {
		CUSTOM_VALUES[key] = {
			formValues : newFormValues[key],
			id         : key,
		};
	});

	return (
		<div>
			<Layout
				control={control}
				fields={[...(requiredControls || []), ...(finalControls || [])]}
				errors={errors}
				customValues={CUSTOM_VALUES}
			/>

			<div className={styles.button_container}>
				<Button themeType="secondary" onClick={() => setStep(STEP_TWO)}>Back</Button>

				<Button themeType="primary" onClick={handleSubmit(onSubmit)}>Submit</Button>
			</div>
		</div>
	);
}
export default Rate;
