import { useFieldArray, SelectController } from '@cogoport/forms';
import { IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import getPrimaryControls from '../../../../../configurations/get-block-primary-controls';
import blockOptions from '../../../../../constants/select-block-options';
import SubBlock from '../SubBlock';

import styles from './styles.module.css';

const OFFSET = 1;

function Block({
	key = '', name = '', control = {}, errors = {},
	index = 0, removeBlock = () => {}, watch = () => {}, data = {},
}) {
	const { fields, append, remove } = useFieldArray({
		control,
		name,
	});

	const CHILD_EMPTY_VALUES = {};

	getPrimaryControls().forEach((controlItem) => {
		if (controlItem.type === 'fieldArray') {
			const NESTED_CHILD_EMPTY_VALUES = {};

			controlItem.controls.forEach((childControlItem) => {
				NESTED_CHILD_EMPTY_VALUES[childControlItem.name] = '';
			});

			CHILD_EMPTY_VALUES[controlItem.name] = NESTED_CHILD_EMPTY_VALUES;
		} else {
			CHILD_EMPTY_VALUES[controlItem.name] = '';
		}
	});

	const blockValue = watch(`blocks.${index}.block`);

	const IS_DEFAULT = false;

	const subBlockType = data.sub_block_type;

	return (
		<div className={styles.container} key={key}>

			<div className={styles.header}>
				<div className={styles.block_number}><p>{index + OFFSET}</p></div>

				<div role="presentation" className={styles.delete_block} onClick={() => removeBlock(index)}>
					<IcMDelete className={styles.icon} />
					<div className={styles.underline_text}>Delete Block</div>
				</div>
			</div>

			<div className={styles.inner_container}>
				<div className={styles.label}>
					Select Block
					<sup className={styles.sup}>*</sup>
				</div>

				<div>
					<SelectController name={`${name}.block`} control={control} options={blockOptions} />

					{errors[`${name}.block`] && (
						<div className={styles.error_msg}>This is required</div>
					)}
				</div>
			</div>

			{fields.map((field, subBlockIndex) => (
				<SubBlock
					key={field.id}
					name={`${name}.${subBlockIndex}`}
					index={subBlockIndex}
					control={control}
					blockValue={blockValue}
					subBlockType={subBlockType}
					removeSubBlock={remove}
					isDefault={IS_DEFAULT}
				/>
			))}

			{!IS_DEFAULT && (
				<div role="presentation" onClick={() => append(CHILD_EMPTY_VALUES)} className={styles.add_btn}>
					+
					{' '}
					<span className={styles.underline_text}>
						Add
						{' '}
						{startCase(subBlockType)}
					</span>
				</div>
			)}

		</div>
	);
}

export default Block;
