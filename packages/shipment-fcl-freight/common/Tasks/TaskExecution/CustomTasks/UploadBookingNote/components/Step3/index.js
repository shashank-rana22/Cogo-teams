import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Layout } from '@cogoport/ocean-modules';
import { useEffect } from 'react';

import styles from './styles.module.css';

const DEFAULT_PRICE_VALUE = 0;
const DEFAULT_QUANTITY_VALUE = 0;
const STEP_ON_BACK = 2;
const QUANTITY_ONE = 1;

function StepThree({ data = {}, setStep = () => {}, shipment_id = '', updateServiceFunc = () => {}, loading = false }) {
	const { finalControls, defaultValues, onSubmit = () => {} } = data || {};

	const formProps = useForm({ defaultValues });

	const { service_charges_with_trade = [] } = data;

	const { control, handleSubmit, formState:{ errors = {} } = {}, watch, setValue } = formProps || {};
	const formValues = watch();

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			const [service_id, index, unit] = name.split('.');
			if (unit === 'unit') {
				const finalValue = value[service_id].map((val, idx) => {
					if (idx === +index) {
						const { service_detail = [] } = service_charges_with_trade
							.find((element) => element.service_id === service_id);
						const prefillKey = GLOBAL_CONSTANTS.selected_unit_to_prefill_value_mapping?.[val.unit];
						const prefillValue = service_detail[GLOBAL_CONSTANTS.zeroth_index][prefillKey] || QUANTITY_ONE;
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
		const allFormValues = { ...formValues };
		(Object.keys(formValues) || []).forEach((key) => {
			if (key && formValues[key]) {
				allFormValues[key] = (allFormValues[key] || []).map((value) => ({
					...value,
					total    : (value.price || DEFAULT_PRICE_VALUE) * (value.quantity || DEFAULT_QUANTITY_VALUE),
					currency : 'INR',
				}));
			}
		});

		return allFormValues;
	};

	const newFormValues = prepareFormValues();
	const CUSTOM_FORM_VALUES = {};

	Object.keys(formValues).forEach((key) => {
		CUSTOM_FORM_VALUES[key] = {
			formValues : newFormValues[key],
			id         : key,
		};
	});

	const handleFinalSubmit = (values) => {
		onSubmit(values);
		updateServiceFunc();
	};

	return (
		<div>
			<Layout
				control={control}
				fields={finalControls}
				errors={errors}
				customValues={CUSTOM_FORM_VALUES}
				shipment_id={shipment_id}
			/>

			<div className={styles.button_container}>
				<Button themeType="secondary" onClick={() => setStep(STEP_ON_BACK)}>Back</Button>

				<Button themeType="primary" onClick={handleSubmit(handleFinalSubmit)} disabled={loading}>Submit</Button>
			</div>
		</div>
	);
}
export default StepThree;
