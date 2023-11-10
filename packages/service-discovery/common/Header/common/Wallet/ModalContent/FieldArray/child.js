import { IcMDelete } from '@cogoport/icons-react';

import getElementController from '../../../../../../configs/getElementController';
import getErrorMessage from '../../../../../../configs/getErrorMessage';

import styles from './styles.module.css';

const DEFAULT_SPAN = 12;
const PERCENTAGE_FACTOR = 100;
const FLEX_OFFSET = 1;

const NUMBER_OF_ITEMS_TO_DELETE = 1;
const MIN_LENGTH_TO_SHOW_DELETE = 2;

function Child({
	controls = [],
	control = () => {},
	index = 0,
	name = '',
	remove = () => {},
	disabled = false,
	showLabelOnce = false,
	lowerlabel = '',
	error = {},
	length = 0,
}) {
	return (
		<div className={styles.form_container}>
			<div className={styles.content}>
				{controls.map((controlItem) => {
					const newControl = { ...controlItem };

					const {
						type,
						name: controlName,
						span,
						subLabel = '',
					} = newControl;

					const flex = ((span || DEFAULT_SPAN) / DEFAULT_SPAN) * PERCENTAGE_FACTOR - FLEX_OFFSET;

					const Element = getElementController(type);

					const errorOriginal = getErrorMessage({
						error : error?.[controlName],
						rules : controlItem?.rules,
						label : controlItem?.label,
					});

					return (
						<div
							className={styles.form_item}
							style={{ width: `${flex}%` }}
							key={`create_form_${newControl.name}_${index}`}
						>
							{(showLabelOnce && !index && newControl.label)
							|| (!showLabelOnce && newControl.label) ? (
								<div className={styles.heading}>
									{newControl.label || lowerlabel}
									{newControl?.rules?.required ? (
										<div className={styles.required_mark}>*</div>
									) : null}
								</div>
								) : null}

							<Element
								width="100%"
								key={`create_form_${newControl.name}_${index}`}
								itemKey={`create_form_${newControl.name}_${index}`}
								control={control}
								id={`create_form_${newControl.name}_${index}`}
								{...newControl}
								disabled={disabled}
								name={`${name}[${index}].${newControl.name}`}
							/>
							{subLabel ? (
								<div className={styles.sub_label}>{subLabel}</div>
							) : null}
							<div className={styles.error_message}>
								{errorOriginal}
							</div>
						</div>
					);
				})}

			</div>

			{length >= MIN_LENGTH_TO_SHOW_DELETE && !disabled ? (
				<IcMDelete
					className={styles.remove_icon}
					onClick={() => remove(index, NUMBER_OF_ITEMS_TO_DELETE)}
				/>
			) : null}
		</div>
	);
}
export default Child;
