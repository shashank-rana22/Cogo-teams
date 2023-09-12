import { Button } from '@cogoport/components';
import { SelectController } from '@cogoport/forms';
import { IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import blockOptions from '../../../../../constants/select-block-options';
import SubBlock from '../SubBlock';

import styles from './styles.module.css';
import useBlockCreation from './useBlockCreation';

const OFFSET = 1;

function Block(props) {
	const {
		key,
		name,
		control,
		errors,
		index,
		removeBlock,
		watch,
	} = props;

	const {
		subBlockType,
		CHILD_EMPTY_VALUES,
		watchBlock,
		IS_DEFAULT,
		fields,
		append,
		remove,
		subBlockOptions,
		parameterOptions = {},
	} = useBlockCreation({ control, name, watch });

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

				<SelectController name={`${name}.block`} control={control} options={blockOptions} />

				{errors[`${name}.block`] && (
					<div className={styles.error_msg}>This is required</div>
				)}
			</div>

			{fields.map((field, subBlockIndex) => (
				<SubBlock
					key={field.id}
					name={`${name}.${subBlockIndex}`}
					index={index}
					subBlockIndex={subBlockIndex}
					control={control}
					watch={watch}
					watchBlock={watchBlock}
					subBlockType={subBlockType}
					removeSubBlock={remove}
					isDefault={IS_DEFAULT}
					subBlockOptions={subBlockOptions}
					parameterOptions={parameterOptions}
				/>
			))}

			{!!subBlockType && !!watchBlock && (
				<Button
					type="button"
					size="md"
					themeType="link"
					onClick={() => append(CHILD_EMPTY_VALUES)}
				>
					+ Add
					{' '}
					{startCase(subBlockType)}
				</Button>
			)}
		</div>
	);
}

export default Block;
