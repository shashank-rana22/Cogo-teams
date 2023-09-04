import { Button } from '@cogoport/components';
import { AsyncSelectController, InputController, useFieldArray, useForm } from '@cogoport/forms';
import React from 'react';

import useGenerateAndSubmitCertificate from '../helpers/useGenerateAndSubmitCertificate';

import styles from './styles.module.css';

const DEFAULT_FREIGHT_PRICE = 0;

function FreightRate({
	task = {},
	containersData = [],
	commodityValues = {},
	shipmentData = {},
	refetch = () => {},
	onCancel = () => {},
	generateCertificate = () => {},
	updateTask = () => {},
	loading = false,
}) {
	const { handleSubmit, control, formState: { errors }, setValue, watch } = useForm({
		defaultValues: {
			freight_declaration: [{
				commodity     : '',
				currency      : '',
				freight_price : '',
				origin_price  : '',
				total_charge  : '',
			}],
		},
	});

	const { fields } = useFieldArray({
		control,
		name: 'freight_declaration',
	});

	const formValues = watch();

	const { onSubmit } = useGenerateAndSubmitCertificate({
		task,
		containersData,
		commodityValues,
		shipmentData,
		refetch,
		onCancel,
		setValue,
		formValues,
		updateTask,
		generateCertificate,

	});

	return (
		<div>
			{fields.map((field, index) => (
				<div key={field.id} style={{ flex: '0 0 100%' }}>
					<div className={styles.field_array}>
						<div className={styles.input_container}>
							<label htmlFor="commodity">Commodity</label>

							<InputController
								name={`freight_declaration.${index}.commodity`}
								control={control}
								size="sm"
								rules={{ required: { value: true, message: 'Commodity is required' } }}
							/>

							{errors.freight_declaration && (
								<span className={styles.errors}>
									{errors.freight_declaration[index]?.commodity?.message}
								</span>
							)}
						</div>

						<div className={styles.input_container}>
							<label htmlFor="currency">Currency</label>

							<AsyncSelectController
								name={`freight_declaration.${index}.currency`}
								control={control}
								size="sm"
								valueKey="iso_code"
								labelKey="iso_code"
								asyncKey="list_exchange_rate_currencies"
								rules={{ required: { value: true, message: 'Currency is required' } }}
							/>

							{errors.freight_declaration && (
								<span className={styles.errors}>
									{errors.freight_declaration[index]?.currency?.message}
								</span>
							)}
						</div>

						<div className={styles.input_container}>
							<label htmlFor="freight_price">Rate per container</label>

							<InputController
								name={`freight_declaration.${index}.freight_price`}
								control={control}
								type="number"
								size="sm"
								rules={{ required: { value: true, message: 'Freight Price is required' } }}
							/>

							{errors.freight_declaration && (
								<span className={styles.errors}>
									{errors.freight_declaration[index]?.freight_price?.message}
								</span>
							)}
						</div>

						<div className={styles.input_container}>
							<label htmlFor="origin_price">Exwork</label>

							<InputController
								name={`freight_declaration.${index}.origin_price`}
								control={control}
								type="number"
								size="sm"
								rules={{ required: { value: true, message: 'Origin Price is required' } }}
							/>

							{errors.freight_declaration && (
								<span className={styles.errors}>
									{errors.freight_declaration[index]?.origin_price?.message}
								</span>
							)}
						</div>

						<div className={styles.input_container}>
							<label>Total</label>

							<div>
								{Number(formValues?.freight_declaration[index]?.freight_price || DEFAULT_FREIGHT_PRICE)
								+ Number(formValues?.freight_declaration[index]?.origin_price || DEFAULT_FREIGHT_PRICE)}
							</div>
						</div>
					</div>

				</div>
			))}

			<div className={styles.button_wrapper}>
				<Button
					themeType="secondary"
					style={{ marginRight: 10 }}
					disabled={loading}
					onClick={onCancel}
				>
					Cancel
				</Button>

				<Button
					onClick={handleSubmit(onSubmit)}
					disabled={loading}
				>
					Update
				</Button>
			</div>

		</div>
	);
}

export default FreightRate;
