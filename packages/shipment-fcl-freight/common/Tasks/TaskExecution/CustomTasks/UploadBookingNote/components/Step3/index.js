import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { Layout } from '@cogoport/ocean-modules';
import { useEffect } from 'react';

import useListShipmentBookingConfirmationPreferences from
	'../../../../../../../hooks/useListShipmentBookingConfirmationPreferences';

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
	const line_items = selected_priority?.data?.[0]?.validities?.[0]?.line_items;

	const origin_locals = selected_priority?.data?.[0]?.origin_locals;
	const destination_locals = selected_priority?.data?.[0]?.destination_locals;

	const origin_locals_line_items = origin_locals?.line_items;
	const destination_locals_line_items = destination_locals?.line_items;

	const formProps = useForm({ defaultValues });

	const { control, handleSubmit, formState:{ errors = {} } = {}, watch, setValue } = formProps || {};
	const formValues = watch();

	useEffect(() => {
		if ((line_items || []).length) {
			setValue(`${selected_priority?.service_id}`, line_items);
		}
		if (origin_locals?.service_id) {
			setValue(`${origin_locals?.service_id}`, origin_locals_line_items);
		}
		if (destination_locals?.service_id) {
			setValue(`${destination_locals?.service_id}`, destination_locals_line_items);
		}
	}, [setValue, selected_priority?.service_id, line_items, origin_locals, origin_locals_line_items,
		destination_locals,
		destination_locals_line_items]);

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
