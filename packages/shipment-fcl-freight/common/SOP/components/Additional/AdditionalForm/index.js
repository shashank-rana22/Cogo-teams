import { Button } from '@cogoport/components';
import { InputController, SelectController, UploadController, useFieldArray, useForm } from '@cogoport/forms';
import { IcMDelete, IcMPlusInCircle } from '@cogoport/icons-react';

import categoryOptions from './categoryOptions';
import styles from './styles.module.css';

const EMPTY_VALUES = {
	category : '',
	remarks  : '',
	document : '',
};
function AdditionalForm({ setShowForm = () => {} }) {
	const { control } = useForm({
		defaultValues: {
			addtional: [EMPTY_VALUES],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'addtional',
	});

	return (
		<div className={styles.form_container}>
			<form>
				{fields.map((item, index) => (
					<div key={item.id} className={styles.field_array_container}>
						<div className={styles.row}>
							<div className={styles.form_item_container}>
								<label>Category</label>
								<SelectController
									size="sm"
									name={`addition.${index}.category`}
									control={control}
									options={categoryOptions}
								/>
							</div>
							<div className={styles.form_item_container}>
								<label>Comment</label>
								<InputController
									size="sm"
									name={`addition.${index}.remarks`}
									control={control}
								/>
							</div>
						</div>

						<div className={styles.form_item_container}>
							<label>Document</label>
							<UploadController
								name={`addition.${index}.document`}
								control={control}
							/>
						</div>
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
