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
		parameterUnitOptions = {},
	} = props;

	const [scoringType, paramType] = watch([`${name}.${index}.scoring_type`, `${name}.${index}.parameter`]);
	const paramUnitOptions = parameterUnitOptions[paramType];

	return (
		<div key={scoringType} className={styles.content}>
			{controls.map((controlItem) => {
				const { name: controlName, type, style, ...rest } = controlItem;

				const Element = getFieldController(type);

				if (!Element || (scoringType === 'absolute'
					&& ['fixed_percentage_value', 'variable_percentage_value'].includes(controlName))
					|| (scoringType === 'percentage' && controlName === 'base_score')) return null;

				return (
					<div key={`${name}.${index}.${controlName}`} className={styles.list} style={style}>

						<div className={styles.label}>{controlItem.label}</div>

						<Element
							key={`${name}.${index}.${controlName}`}
							control={control}
							id={`create_form_${controlName}_field`}
							{...rest}
							name={`${name}.${index}.${controlName}`}
							{...(controlName === 'scoring_unit') ? { options: paramUnitOptions } : {}}
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
						height       : '16px',
						width        : '16px',
						cursor       : 'pointer',
						marginBottom : '12px',
					}}
				/>
			) : null}
		</div>
	);
}
export default Child;
