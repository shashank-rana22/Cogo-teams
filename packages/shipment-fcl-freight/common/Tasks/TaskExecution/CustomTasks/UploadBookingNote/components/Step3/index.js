import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { Layout } from '@cogoport/ocean-modules';

import styles from './styles.module.css';

const SECOND_STEP = 2;
const CUSTOM_VALUES = {};

function Step3({ data, setStep, shipment_id }) {
	const { finalControls, DEFAULT_VALUES, onSubmit = () => {} } = data || {};

	const formProps = useForm({ defaultValues: DEFAULT_VALUES });
	const { control, handleSubmit, formState:{ errors = {} } = {}, watch } = formProps || {};

	const formValues = watch();

	const prepareFormValues = () => {
		const allFormValues = { ...formValues };
		(Object.keys(formValues) || []).forEach((key) => {
			if (key && formValues[key]) {
				allFormValues[key] = (allFormValues[key] || []).map((value) => {
					const { price = 0, quantity = 0 } = value;
					return {
						...value,
						total    : price * quantity,
						currency : GLOBAL_CONSTANTS.currency_code.INR,
					};
				});
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
				<Button themeType="secondary" onClick={() => setStep(SECOND_STEP)}>Back</Button>

				<Button themeType="primary" onClick={handleSubmit(onSubmit)}>Submit</Button>
			</div>
		</div>
	);
}
export default Step3;
