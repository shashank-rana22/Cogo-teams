import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { Layout } from '@cogoport/surface-modules';

import styles from './styles.module.css';

const DEFAULT_VALUE = 0;

function EditQuotations({ data = {}, shipment_id = '', onCancel = () => {} }) {
	const { finalControls, defaultValues, onSubmit = () => {} } = data || {};

	const formProps = useForm({ defaultValues });
	const { control, handleSubmit, formState:{ errors = {} } = {}, watch } = formProps || {};

	const CUSTOM_VALUES = {};
	const formValues = watch();

	const prepareFormValues = () => {
		const allFormValues = { ...formValues };
		(Object.keys(formValues) || []).forEach((key) => {
			if (key && formValues[key]) {
				allFormValues[key] = (allFormValues[key] || []).map((value) => ({
					...value,
					total    : (value.price || DEFAULT_VALUE) * (value.quantity || DEFAULT_VALUE),
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
				<Button themeType="secondary" disabled={data?.loading} onClick={() => onCancel()}>Back</Button>

				<Button themeType="primary" disabled={data?.loading} onClick={handleSubmit(onSubmit)}>Submit</Button>
			</div>
		</div>
	);
}
export default EditQuotations;
