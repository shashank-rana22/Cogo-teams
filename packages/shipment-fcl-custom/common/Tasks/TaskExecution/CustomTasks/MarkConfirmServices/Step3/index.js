import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Layout } from '@cogoport/ocean-modules';
import UNIT_VALUE_MAPPING from '@cogoport/ocean-modules/constants/UNIT_VALUE_MAPPING';
import { useEffect } from 'react';

import styles from './styles.module.css';

const QUANTITY_ONE = 1;
const STEP_TWO = 2;
const PRICE_ZERO = 0;
const QUANTITY_ZERO = 0;

function StepThree({ data = {}, setStep = () => {}, shipment_id = '' }) {
	const { finalControls, defaultValues, onSubmit = () => {} } = data || {};

	const formProps = useForm({ defaultValues });
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
						const prefillKey = UNIT_VALUE_MAPPING?.[val?.unit];
						const prefillValue = service_detail[GLOBAL_CONSTANTS.zeroth_index]?.[prefillKey]
						|| (val?.unit === 'per_shipment' ? QUANTITY_ONE : '');
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
				fields={finalControls}
				errors={errors}
				customValues={CUSTOM_VALUES}
				shipment_id={shipment_id}
			/>

			<div className={styles.button_container}>
				<Button themeType="secondary" onClick={() => setStep(STEP_TWO)}>Back</Button>

				<Button themeType="primary" onClick={handleSubmit(onSubmit)}>Submit</Button>
			</div>
		</div>
	);
}
export default StepThree;
