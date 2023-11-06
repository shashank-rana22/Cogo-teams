import { SelectController } from '@cogoport/forms';
import { IcMDelete } from '@cogoport/icons-react';
import { isEmpty, startCase } from '@cogoport/utils';

import FieldArray from '../../../../ScoringPlans/commons/FieldArray';

import styles from './styles.module.css';
import useSubBlockCreation from './useSubBlockCreation';

function SubBlock(props) {
	const {
		name,
		blockIndex,
		subBlockIndex,
		control,
		errors,
		watch,
		subBlockType,
		subBlockOptions,
		subBlockWiseParameterOptions,
		editSubBlock,
		watchBlock,
		removeSubBlock,
	} = props;

	const {
		controls = [],
		parameterOptions = [],
		parameterUnitOptions = {},
		filteredSubBlockOptions = [],
		setParamScoringType = () => {},
	} = useSubBlockCreation({
		subBlockWiseParameterOptions,
		watch,
		blockIndex,
		subBlockIndex,
		subBlockOptions,
	});

	const isEditMode = editSubBlock[blockIndex]?.[subBlockIndex];

	const isSubBlockEmpty = isEmpty(watch(name)?.parameters);

	return (
		<div className={styles.container}>

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
							options={filteredSubBlockOptions}
							value={watch(`blocks[${blockIndex}].sub_blocks[${subBlockIndex}].sub_block_id`)}
							rules={{ required: `${subBlockType} is required` }}
							disabled={!isSubBlockEmpty}
						/>

						{errors?.blocks?.[blockIndex]?.sub_blocks?.[subBlockIndex]?.sub_block_id && (
							<div className={styles.error_msg}>Required</div>
						)}
					</div>

					<div
						role="presentation"
						className={styles.delete_block}
						onClick={() => {
							// if (isEmpty(checkForSubBlock())) {
							removeSubBlock(subBlockIndex);
							// }
							// handleClick({ subBlockStatus: 'inactive' });
						}}
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
					watchBlock={watchBlock}
					blockIndex={blockIndex}
					subBlockIndex={subBlockIndex}
					parameterOptions={parameterOptions}
					parameterUnitOptions={parameterUnitOptions}
					// setParam={setParam}
					setParamScoringType={setParamScoringType}
					error={errors?.blocks?.[blockIndex]?.sub_blocks?.[subBlockIndex]?.parameters}
				/>
			</div>
		</div>
	);
}

export default SubBlock;
