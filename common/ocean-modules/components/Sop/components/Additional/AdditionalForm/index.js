import { Button } from '@cogoport/components';
import { InputController, SelectController, UploadController, useFieldArray, useForm } from '@cogoport/forms';
import { IcMDelete, IcMPlusInCircle } from '@cogoport/icons-react';

import useCreateShipmentOperatingInstruction from '../../../../../hooks/useCreateShipmentOperatingInstruction';
import getCreateInstructionParams from '../helpers/getCreateInstructionParams';

import categoryOptions from './categoryOptions';
import styles from './styles.module.css';

const EMPTY_VALUES = {
	category : '',
	remarks  : '',
	document : '',
};
function AdditionalForm({
	setShowForm = () => {},
	shipment_ids = {},
	getProcedureTrigger = () => {},
}) {
	const { shipment_id, organization_id, procedure_id } = shipment_ids;

	const afterUpdateOrCreateRefetch = () => {
		setShowForm(false);
		getProcedureTrigger();
	};

	const { apiTrigger:createTrigger, loading:createLoading } =	 useCreateShipmentOperatingInstruction({
		shipment_id,
		organization_id,
		procedure_id,
		refetch: afterUpdateOrCreateRefetch,
	});

	const { control, handleSubmit, formState:{ errors = {} } } = useForm({
		defaultValues: {
			additional: [EMPTY_VALUES],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'additional',
	});

	const onSubmit = (formValues) => {
		const params = getCreateInstructionParams({ formValues });
		createTrigger(params);
	};

	function Error(key) {
		const [object, index, keyName] = (key || '').split('.');

		return errors?.[object]?.[index]?.[keyName]
			? <div className={styles.errors}>{errors?.[object]?.[index]?.[keyName]?.message}</div> : null;
	}

	return (
		<div className={styles.form_container}>
			<form>
				{fields.map((item, index) => (
					<div key={item.id} className={styles.field_array_container}>
						<div className={styles.row}>
							<div className={styles.form_item_container}>
								<label className={styles.form_label}>Category</label>
								<SelectController
									size="sm"
									name={`additional.${index}.category`}
									control={control}
									options={categoryOptions}
									rules={{ required: { value: true, message: 'Category is required' } }}
								/>
								{Error(`additional.${index}.category`)}
							</div>
							<div className={styles.form_item_container}>
								<label className={styles.form_label}>Comment</label>
								<InputController
									size="sm"
									name={`additional.${index}.remarks`}
									control={control}
									rules={{ required: { value: true, message: 'Comment is required' } }}
								/>
								{Error(`additional.${index}.remarks`)}
							</div>
						</div>

						<div className={styles.form_item_container}>
							<label className={styles.form_label}>Document</label>
							<UploadController
								name={`additional.${index}.document`}
								control={control}
							/>
						</div>
						{index !== 0 && (
							<div>
								<Button
									type="button"
									onClick={() => remove(index)}
									themeType="tertiary"
								>
									<span className={styles.delete_content}>
										<IcMDelete />
										Delete
									</span>
								</Button>

							</div>
						)}
					</div>
				))}

				<div className={styles.add_container}>
					<Button
						onClick={() => append(EMPTY_VALUES)}
						themeType="tertiary"
					>
						<div className={styles.add_content}>
							<IcMPlusInCircle height={16} width={16} />
							&nbsp;
							Add
						</div>
					</Button>
				</div>

				<div className={styles.form_action}>
					<div className={styles.cancel}>
						<Button
							onClick={() => setShowForm(false)}
							size="sm"
							themeType="secondary"
						>
							Cancel

						</Button>
					</div>
					<div>
						<Button
							size="sm"
							themeType="accent"
							onClick={handleSubmit(onSubmit)}
							disabled={createLoading}
						>
							Submit

						</Button>
					</div>
				</div>
			</form>

		</div>
	);
}

export default AdditionalForm;
