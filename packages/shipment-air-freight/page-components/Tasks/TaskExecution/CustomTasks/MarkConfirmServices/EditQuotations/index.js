import { Layout } from '@cogoport/air-modules';
import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import GLOBAL_CONSTANTS from '@cogoport/globalization/constants/globals';
import { useState, useEffect } from 'react';

import ConfirmModal from './ConfirmModal';
import styles from './styles.module.css';

const DEFAULT_VALUE_FOR_NULL_HANDLING = 0;
const QUANTITY_ONE = 1;
const USD_LIMIT = 5000;
const INR_LIMIT = 500000;

function EditQuotations({
	data = {},
	shipment_id = '',
	onCancel = () => {},
	airServiceFormValues = {},
	airLocalServiceFormValues = {},
	reallocationFunc = () => {},
	watchServiceProvider = {},
}) {
	const [confirmModal, setConfirmModal] = useState(false);

	const { service_charges_with_trade = [] } = data;

	const { finalControls, defaultValues, onSubmit = () => {} } = data || {};
	const formProps = useForm({ defaultValues });
	const {
		control, handleSubmit, formState:{ errors = {} } = {},
		watch, loading, confirmLoading, setValue,
	} = formProps || {};

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			const [service_id, index, unit] = name.split('.');
			if (unit === 'unit') {
				const finalValue = value[service_id].map((val, idx) => {
					if (idx === +index) {
						const { service_detail = [] } = (service_charges_with_trade || [])
							.find((element) => element.service_id === service_id);
						const prefillKey = GLOBAL_CONSTANTS.selected_unit_to_prefill_value_mapping?.[val?.unit];
						const prefillValue = service_detail?.[GLOBAL_CONSTANTS.zeroth_index]?.[prefillKey]
						|| QUANTITY_ONE;
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

	const handlePriceLimitCheck = () => (
		Object.values(formValues).some(
			(keys) => keys.some(
				(item) => (item?.currency === GLOBAL_CONSTANTS.currency_code.USD && item?.price >= USD_LIMIT)
			|| (item?.currency === GLOBAL_CONSTANTS.currency_code.INR && item?.price >= INR_LIMIT),
			),
		)
	);

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
					handlePriceLimitCheck={handlePriceLimitCheck}
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
