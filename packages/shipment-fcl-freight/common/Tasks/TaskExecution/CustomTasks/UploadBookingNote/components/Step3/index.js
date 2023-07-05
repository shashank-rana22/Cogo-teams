import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { Layout } from '@cogoport/ocean-modules';
import { useEffect } from 'react';

import useListShipmentBookingConfirmationPreferences from '../../../../../../../hooks/useListShipmentBookingConfirmationPreferences';

import styles from './styles.module.css';

const DEFAULT_PRICE_VALUE = 0;
const DEFAULT_QUANTITY_VALUE = 0;
const STEP_ON_BACK = 2;

function Step3({ data, setStep = () => {}, shipment_id, task }) {
	const { service_type } = task || {};

	const { data: preferences } = useListShipmentBookingConfirmationPreferences({
		shipment_id,
		defaultFilters: {
			service_type,
		},
	});
	const { finalControls, defaultValues, onSubmit = () => {} } = data || {};
	const selected_priority = (preferences?.list || []).find((item) => item?.selected_priority === item?.priority);
	const line_items = selected_priority?.data?.[0]?.validities?.[0]?.line_items || [];
	if (line_items?.length) {
		defaultValues[selected_priority?.service_id] = line_items?.map((line_item) => ({
			code     : line_item?.code,
			currency : line_item?.currency,
			price    : line_item?.price,
			quantity : line_item?.quantity,
			unit     : line_item?.unit,
			total    : line_item?.total,
		}));
	}

	const formProps = useForm({ defaultValues });

	const { control, handleSubmit, formState:{ errors = {} } = {}, watch } = formProps || {};
	const formValues = watch();

	// useEffect(() => {
	// 	setValue(`${selected_priority?.service_id}`, defaultValues);
	// }, [defaultValues, setValue, selected_priority?.service_id]);


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

				<Button themeType="primary" onClick={handleSubmit(onSubmit)}>Submit</Button>
			</div>
		</div>
	);
}
export default Step3;
