import { Button, Loader } from '@cogoport/components';
import { SelectController } from '@cogoport/forms';
import { IcMDelete } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';

import SubBlock from '../SubBlock';

import styles from './styles.module.css';
import useBlockCreation from './useBlockCreation';

const OFFSET = 1;

function Block(props) {
	const {
		name,
		control,
		errors,
		blockIndex,
		removeBlock,
		watch,
		setEditSubBlock,
		prefillValues,
		config_id,
		...rest
	} = props;

	const {
		CHILD_EMPTY_VALUES,
		watchBlock,
		subBlockType,
		fields,
		append,
		remove,
		checkForBlock,
		subBlockOptions,
		subBlockWiseParameterOptions,
		blockParameterLoading,
		filteredBlockOptions,
	} = useBlockCreation({ control, name, watch, blockIndex, prefillValues, config_id });

	const blockData = checkForBlock();

	const isBlockEmpty = isEmpty(watch(name)?.sub_blocks);

	return (
		<div className={styles.container} key={blockParameterLoading}>
			<div className={styles.header}>
				<div className={styles.block_number}><p>{blockIndex + OFFSET}</p></div>

				{isEmpty(blockData) ? (
					<div role="presentation" className={styles.delete_block} onClick={() => removeBlock(blockIndex)}>
						<IcMDelete className={styles.icon} />
						<div className={styles.underline_text}>Delete Block</div>
					</div>
				) : null}

			</div>

			<div className={styles.inner_container}>
				<div className={styles.label}>
					Select Block
					<sup className={styles.sup}>*</sup>
				</div>

				<SelectController
					name={`${name}.block`}
					control={control}
					options={filteredBlockOptions}
					rules={{ required: 'Required' }}
					value={watchBlock}
					disabled={!isBlockEmpty}
				/>

				{errors[`${name}.block`] && (
					<div className={styles.error_msg}>{errors[`${name}.block`]?.message}</div>
				)}
			</div>

			{fields.map((field, subBlockIndex) => (
				<SubBlock
					{...rest}
					key={field.id}
					name={`${name}.sub_blocks.${subBlockIndex}`}
					blockIndex={blockIndex}
					subBlockIndex={subBlockIndex}
					control={control}
					errors={errors}
					watch={watch}
					watchBlock={watchBlock}
					subBlockType={subBlockType}
					removeSubBlock={remove}
					subBlockOptions={subBlockOptions}
					subBlockWiseParameterOptions={subBlockWiseParameterOptions}
				/>
			))}

			{blockParameterLoading ? <Loader themeType="primary" /> : ((subBlockOptions.length !== fields.length) && (
				<Button
					type="button"
					size="md"
					themeType="link"
					style={{ marginTop: '4px' }}
					onClick={() => {
						setEditSubBlock((prev) => ({
							...prev,
							[blockIndex]: {
								...prev[blockIndex],
								[fields.length]: true,
							},
						}));
						append(CHILD_EMPTY_VALUES);
					}}
				>
					+ Add
					{' '}
					{startCase(subBlockType)}
				</Button>
			))}
		</div>
	);
}

export default Block;
