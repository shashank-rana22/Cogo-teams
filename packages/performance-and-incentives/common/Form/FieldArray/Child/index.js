import { IcMDelete } from '@cogoport/icons-react';

import { getFieldController } from '../../getFieldController';

import styles from './styles.module.css';

const FIRST_INDEX = 1;

function Child(props) {
	const {
		controls,
		control,
		index,
		name,
		remove,
		showDeleteButton = true,
		noDeleteButtonTill = 0,
		disabled = false,
		error = {},
		watch = () => {},
	} = props;

	const scoringType = watch(`${name}.${index}.scoring_type`);

	return (
		<div className={styles.content}>
			{controls.map((controlItem) => {
				const Element = getFieldController(controlItem.type);

				if (!Element || (scoringType === 'absolute'
					&& ['fixed_percent', 'variable_percent'].includes(controlItem.name))
					|| (scoringType === 'percentage' && controlItem.name === 'base_score')) return null;

				return (
					<div key={`${name}.${index}.${controlItem.name}`} className={styles.list}>

						<div className={styles.label}>{controlItem.label}</div>

						<Element
							key={`${name}.${index}.${controlItem.name}`}
							control={control}
							id={`create_form_${controlItem.name}_field`}
							{...controlItem}
							name={`${name}.${index}.${controlItem.name}`}
						/>

						<div className={styles.error_message}>
							{error?.[controlItem?.name]?.message}
						</div>
					</div>
				);
			})}

			{showDeleteButton && index >= noDeleteButtonTill && !disabled ? (
				<IcMDelete
					className={`form-fieldArray-${name}-remove`}
					onClick={() => remove(index, FIRST_INDEX)}
					style={{
						height : '16px',
						width  : '16px',
						cursor : 'pointer',
					}}
				/>
			) : null}
		</div>
	);
}
export default Child;
