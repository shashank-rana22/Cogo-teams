import { IcMDelete } from '@cogoport/icons-react';

// import { getFieldController } from '../../../../../../../common/Form/getFieldController';

import { getFieldController } from '../../../../../../../../common/Form/getFieldController';

import styles from './styles.module.css';
import useBlockParameters from './useBlockParameters';

const FIRST_INDEX = 1;

const TRIGGER_CONTROLS = ['provisional_trigger', 'realised_trigger'];

function Child(props) {
	const {
		controls,
		control,
		index,
		name,
		remove,
		blockIndex = 0,
		subBlockIndex = 0,
		showDeleteButton = true,
		noDeleteButtonTill = 0,
		disabled = false,
		error = {},
		watch = () => {},
		parameterOptions = [],
		parameterUnitOptions = {},
	} = props;

	const [scoringType, paramType] = watch([`${name}.${index}.scoring_type`, `${name}.${index}.parameter`]);
	const paramUnitOptions = parameterUnitOptions[paramType];

	const {
		paramOptions,
		memoizedTriggerMapping,
	} = useBlockParameters({
		watch,
		blockIndex,
		subBlockIndex,
		paramType,
		paramIndex: index,
		parameterOptions,
	});

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
							{...(controlName === 'parameter') ? { options: paramOptions } : {}}
							{...(TRIGGER_CONTROLS.includes(controlName)) ? memoizedTriggerMapping[controlName] : {}}
						/>

						<div className={styles.error_message}>
							{error?.[controlItem?.name]?.message}
						</div>
					</div>
				);
			})}

			{showDeleteButton && index >= noDeleteButtonTill && !disabled ? (
				<IcMDelete
					className={styles.delete_btn}
					width={16}
					height={16}
					onClick={() => remove(index, FIRST_INDEX)}
				/>
			) : null}
		</div>
	);
}
export default Child;
