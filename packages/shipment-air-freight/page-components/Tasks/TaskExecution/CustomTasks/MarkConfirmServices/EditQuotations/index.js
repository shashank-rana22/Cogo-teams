import { Layout } from '@cogoport/air-modules';
import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useState } from 'react';

import ConfirmModal from './ConfirmModal';
import styles from './styles.module.css';

const DEFAULT_VALUE_FOR_NULL_HANDLING = 0;
function EditQuotations({
	data,
	shipment_id,
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
		watch, loading, confirmLoading,
	} = formProps || {};

	const CUSTOM_VALUES = {};
	const formValues = watch();

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
