import { Layout } from '@cogoport/air-modules';
import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useState, useEffect } from 'react';

import useListBookingPreferences from '../../../../../../hooks/useListBookingPreferences';
import { DEFAULT_INDEX } from '../../../../../constants';

import ConfirmModal from './ConfirmModal';
import styles from './styles.module.css';

const DEFAULT_VALUE_FOR_NULL_HANDLING = 0;
function EditQuotations({
	data,
	shipment_id,
	service_type,
	onCancel,
	airServiceFormValues,
	airLocalServiceFormValues,
	reallocationFunc,
	watchServiceProvider,
}) {
	const [confirmModal, setConfirmModal] = useState(false);

	const { finalControls, defaultValues, onSubmit = () => {} } = data || {};
	const formProps = useForm({ defaultValues });
	const {
		control, handleSubmit, formState:{ errors = {} } = {},
		watch, loading, confirmLoading, setValue,
	} = formProps || {};

	const CUSTOM_VALUES = {};
	const formValues = watch();

	const { data: preferences } = useListBookingPreferences({
		shipment_id,
		defaultFilters: { service_type },
	});

	const selected_priority = (preferences?.list || []).find((item) => item?.selected_priority === item?.priority);
	const origin_locals = selected_priority?.data?.[DEFAULT_INDEX]?.origin_locals;
	const destination_locals = selected_priority?.data?.[DEFAULT_INDEX]?.destination_locals;
	const origin_locals_line_items = origin_locals?.line_items;
	const destination_locals_line_items = destination_locals?.line_items;

	useEffect(() => {
		const freight_line_items = (
			selected_priority?.data?.[DEFAULT_INDEX]?.line_items || []
		);
		if (freight_line_items.length) {
			setValue(`${selected_priority?.service_id}`, freight_line_items);
		}
		if (origin_locals?.service_id) {
			setValue(`${origin_locals?.service_id}`, origin_locals_line_items);
		}
		if (destination_locals?.service_id) {
			setValue(`${destination_locals?.service_id}`, destination_locals_line_items);
		}
	}, [
		selected_priority,
		origin_locals?.service_id,
		destination_locals?.service_id,
		origin_locals_line_items,
		destination_locals_line_items,
		setValue,
	]);

	const prepareFormValues = () => {
		const allFormValues = { ...formValues };
		(Object.keys(formValues) || []).forEach((key) => {
			if (key && formValues[key]) {
				allFormValues[key] = (allFormValues[key] || []).map((value) => ({
					...value,
					total: (value.price || DEFAULT_VALUE_FOR_NULL_HANDLING)
					* (value.quantity || DEFAULT_VALUE_FOR_NULL_HANDLING),
					currency: 'INR',
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
				<Button themeType="secondary" onClick={() => onCancel()}>Back</Button>

				<Button
					themeType="primary"
					onClick={handleSubmit(() => setConfirmModal(true))}
					disabled={loading}
				>
					Confirm

				</Button>
			</div>
			{confirmModal && (
				<ConfirmModal
					confirmModal={confirmModal}
					setConfirmModal={setConfirmModal}
					airServiceFormValues={airServiceFormValues}
					airLocalServiceFormValues={airLocalServiceFormValues}
					handleSubmit={handleSubmit}
					onCreate={onSubmit}
					reallocationFunc={reallocationFunc}
					confirmLoading={confirmLoading}
					watchServiceProvider={watchServiceProvider}
				/>
			)}
		</div>
	);
}
export default EditQuotations;
