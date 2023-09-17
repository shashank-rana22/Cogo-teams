import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { Layout } from '@cogoport/ocean-modules';

import styles from './styles.module.css';

const DEFAULT_PRICE_VALUE = 0;
const DEFAULT_QUANTITY_VALUE = 0;
const HTTP_STATUS_CODE = 200;

function EditQuotation({
	data = {},
	shipment_id = '',
	loading = false,
	setIsQuotation = () => {},
	updateDocument = () => {},
	documentPayload = {},
}) {
	const { finalControls = [], defaultValues = {}, onSubmit = () => { } } = data || {};

	const { control, handleSubmit, formState:{ errors = {} } = {}, watch } = useForm({ defaultValues });

	const formValues = watch();

	const prepareFormValues = () => {
		const allFormValues = { ...formValues };
		(Object.keys(formValues) || []).forEach((key) => {
			if (key && formValues[key]) {
				allFormValues[key] = (allFormValues[key] || []).map((value) => ({
					...value,
					total: (value.price || DEFAULT_PRICE_VALUE) * (value.quantity || DEFAULT_QUANTITY_VALUE),
				}));
			}
		});

		return allFormValues;
	};

	const newFormValues = prepareFormValues();
	const CUSTOM_FORM_VALUES = {};

	(Object.keys(formValues) || []).forEach((key) => {
		CUSTOM_FORM_VALUES[key] = {
			formValues : newFormValues[key],
			id         : key,
		};
	});

	const handleFinalSubmit = async (values) => {
		const apiResponseCode = await onSubmit(values);

		if (apiResponseCode === HTTP_STATUS_CODE) {
			await updateDocument(documentPayload);
		}
	};

	return (
		<>
			<Layout
				control={control}
				fields={finalControls}
				errors={errors}
				customValues={CUSTOM_FORM_VALUES}
				shipment_id={shipment_id}
			/>

			<div className={styles.button_container}>
				<Button themeType="secondary" onClick={() => setIsQuotation(false)}>Back</Button>

				<Button
					themeType="primary"
					onClick={handleSubmit(handleFinalSubmit)}
					loading={loading}
					disabled={loading}
				>
					Submit
				</Button>
			</div>
		</>
	);
}
export default EditQuotation;
