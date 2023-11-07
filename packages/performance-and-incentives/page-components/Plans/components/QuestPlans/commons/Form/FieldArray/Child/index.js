import { IcMDelete } from '@cogoport/icons-react';

import { getFieldController } from '../../../../../../../../common/Form/getFieldController';

import styles from './styles.module.css';
import useBlockParameters from './useBlockParameters';

const FIRST_INDEX = 1;

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
		onChangeChild = () => {},
		onDeleteChild = () => {},
	} = props;

	const {
		paramOptions,
	} = useBlockParameters({
		watch,
		blockIndex,
		subBlockIndex,
		paramIndex: index,
		parameterOptions,
	});

	const subBlockId = watch(`blocks[${blockIndex}].sub_blocks[${subBlockIndex}].sub_block_id`);

	return (
		<div className={styles.content}>
			{controls.map((controlItem) => {
				const { name: controlName, type, style, ...rest } = controlItem;

				const Element = getFieldController(type);

				if (!Element) return null;
				return (
					<div key={`${name}.${index}.${controlName}`} className={styles.list} style={style}>

						<div className={styles.label}>{controlItem.label}</div>

						<Element
							key={`${name}.${index}.${controlName}`}
							control={control}
							id={`create_form_${controlName}_field`}
							{...rest}
							name={`${name}.${index}.${controlName}`}
							{...(controlName === 'parameter') ? { options: paramOptions } : {}}
							onChange={(val, obj) => onChangeChild({
								val,
								obj,
								index,
								name         : controlItem?.name,
								subBlockName : subBlockId,
							})}
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
					onClick={() => { remove(index, FIRST_INDEX); onDeleteChild({ index, subBlockName: subBlockId }); }}
				/>
			) : null}
		</div>
	);
}
export default Child;
