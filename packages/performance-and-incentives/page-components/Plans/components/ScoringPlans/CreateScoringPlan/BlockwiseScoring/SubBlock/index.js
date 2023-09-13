import { Button } from '@cogoport/components';
import { SelectController } from '@cogoport/forms';
import { IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import FieldArray from '../../../../../../../common/Form/FieldArray';

import styles from './styles.module.css';
import useSubBlockCreation from './useSubBlockCreation';

function SubBlock(props) {
	const {
		key,
		name,
		blockIndex,
		subBlockIndex,
		control,
		errors,
		watch,
		handleSubmit,
		subBlockType,
		subBlockOptions,
		subBlockWiseParameterOptions,
		refetch,
		editSubBlock,
		setEditSubBlock,
	} = props;

	const {
		controls = [],
		handleClick = () => {},
		parameterUnitOptions = {},
	} = useSubBlockCreation({
		subBlockWiseParameterOptions,
		subBlockType,
		name,
		watch,
		blockIndex,
		subBlockIndex,
		refetch,
		handleSubmit,
		editSubBlock,
		setEditSubBlock,

	});

	const isEditMode = editSubBlock[blockIndex]?.[subBlockIndex];

	return (
		<div className={styles.container} key={key}>

			<div className={`${!isEditMode ? styles.disabled : ''}`}>
				<div className={styles.inner_container}>
					<div className={styles.control_item}>
						<div className={styles.label}>
							{startCase(subBlockType)}
							<sup className={styles.sup}>*</sup>
						</div>

						<SelectController
							name={`${name}.sub_block_id`}
							control={control}
							options={subBlockOptions}
							value={watch(`blocks[${blockIndex}].sub_blocks[${subBlockIndex}].sub_block_id`)}
						/>

						{errors?.[`${name}.sub_block_id`] && (
							<div className={styles.error_msg}>Required</div>
						)}
					</div>

					<div
						role="presentation"
						className={styles.delete_block}
						onClick={() => handleClick({ subBlockStatus: 'inactive' })}
					>
						<IcMDelete className={styles.icon} />

						<div className={styles.underline_text}>
							Delete
							{' '}
							{subBlockType === 'group' ? 'Sub Block' : startCase(subBlockType)}
						</div>
					</div>
				</div>

				<FieldArray
					control={control}
					name={`${name}.parameters`}
					controls={controls}
					buttonThemeType="link"
					buttonText="Add Parameter"
					watch={watch}
					parameterUnitOptions={parameterUnitOptions}
				/>
			</div>

			<Button
				size="md"
				themeType="accent"
				type="button"
				className={styles.btn}
				onClick={handleClick}
			>
				{isEditMode ? 'Save' : 'Edit'}
			</Button>
		</div>
	);
}

export default SubBlock;
