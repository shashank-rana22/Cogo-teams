import { Button, Loader } from '@cogoport/components';
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
		name,
		control,
		errors,
		blockIndex,
		removeBlock,
		watch,
		refetch,
		handleSubmit,
		editSubBlock,
		setEditSubBlock,
		prefillValues,
	} = props;

	const {
		CHILD_EMPTY_VALUES,
		watchBlock,
		subBlockType,
		fields,
		append,
		remove,
		subBlockOptions,
		subBlockWiseParameterOptions,
		blockParameterLoading,
	} = useBlockCreation({ control, name, watch });

	return (
		<div className={styles.container} key={blockParameterLoading}>
			<div className={styles.header}>
				<div className={styles.block_number}><p>{blockIndex + OFFSET}</p></div>

				<div role="presentation" className={styles.delete_block} onClick={() => removeBlock(blockIndex)}>
					<IcMDelete className={styles.icon} />
					<div className={styles.underline_text}>Delete Block</div>
				</div>
			</div>

			<div className={styles.inner_container}>
				<div className={styles.label}>
					Select Block
					<sup className={styles.sup}>*</sup>
				</div>

				<SelectController
					name={`${name}.block`}
					control={control}
					options={blockOptions}
					rules={{ required: 'Required' }}
				/>

				{errors[`${name}.block`] && (
					<div className={styles.error_msg}>{errors[`${name}.block`]?.message}</div>
				)}
			</div>

			{fields.map((field, subBlockIndex) => (
				<SubBlock
					key={field.id}
					name={`${name}.sub_blocks.${subBlockIndex}`}
					blockIndex={blockIndex}
					subBlockIndex={subBlockIndex}
					control={control}
					errors={errors}
					watch={watch}
					handleSubmit={handleSubmit}
					watchBlock={watchBlock}
					subBlockType={subBlockType}
					removeSubBlock={remove}
					subBlockOptions={subBlockOptions}
					subBlockWiseParameterOptions={subBlockWiseParameterOptions}
					refetch={refetch}
					editSubBlock={editSubBlock}
					setEditSubBlock={setEditSubBlock}
					prefillValues={prefillValues}
				/>
			))}

			{blockParameterLoading ? <Loader themeType="primary" /> : (!!subBlockType && (
				<Button
					type="button"
					size="md"
					themeType="link"
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
