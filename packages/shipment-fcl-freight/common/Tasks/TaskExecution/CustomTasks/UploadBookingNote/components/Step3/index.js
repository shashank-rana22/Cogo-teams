import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import Layout from '@cogoport/ocean-modules/components/Layout';

import styles from './styles.module.css';

function Step3({ data, setStep, shipment_id }) {
	const { finalControls, defaultValues, onSubmit = () => {} } = data || {};

	const formProps = useForm({ defaultValues });
	const { control, handleSubmit, formState:{ errors = {} } = {}, watch } = formProps || {};

	const customValues = {};
	const formValues = watch();

	const prepareFormValues = () => {
		const allFormValues = { ...formValues };
		(Object.keys(formValues) || []).forEach((key) => {
			if (key && formValues[key]) {
				allFormValues[key] = (allFormValues[key] || []).map((value) => ({
					...value,
					total    : (value.price || 0) * (value.quantity || 0),
					currency : 'INR',
				}));
			}
		});

		return allFormValues;
	};

	const newFormValues = prepareFormValues();

	Object.keys(formValues).forEach((key) => {
		customValues[key] = {
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
				customValues={customValues}
				shipment_id={shipment_id}
			/>

			<div className={styles.button_container}>
				<Button themeType="secondary" onClick={() => setStep(2)}>Back</Button>

				<Button themeType="primary" onClick={handleSubmit(onSubmit)}>Submit</Button>
			</div>
		</div>
	);
}
export default Step3;
