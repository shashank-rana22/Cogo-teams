import { Button } from '@cogoport/components';
import { SelectController } from '@cogoport/forms';
import { IcMDelete } from '@cogoport/icons-react';
import { startCase, isEmpty } from '@cogoport/utils';

import FieldArray from '../../../commons/FieldArray';

import AdditionalControlsModal from './AdditionalControlsModal';
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
		handleSubmit,
		subBlockType,
		subBlockOptions,
		subBlockWiseParameterOptions,
		refetch,
		editSubBlock,
		setEditSubBlock,
		prefillValues,
		watchBlock,
		removeSubBlock,
		additionalControlsData,
	} = props;

	const {
		param,
		controls = [],
		watchSubBlock = '',
		handleClick = () => {},
		parameterOptions = [],
		parameterUnitOptions = {},
		checkForSubBlock = () => {},
		filteredSubBlockOptions = [],
		additionalControls = {},
		setAdditionalControls = () => {},
		setParam = () => {},
		paramScoringType = '',
		setParamScoringType = () => {},
	} = useSubBlockCreation({
		subBlockWiseParameterOptions,
		subBlockType,
		watch,
		blockIndex,
		subBlockIndex,
		refetch,
		handleSubmit,
		editSubBlock,
		setEditSubBlock,
		prefillValues,
		watchBlock,
		subBlockOptions,
		additionalControlsData,
	});

	const isEditMode = editSubBlock[blockIndex]?.[subBlockIndex];

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
						/>

						{errors?.blocks?.[blockIndex]?.sub_blocks?.[subBlockIndex]?.sub_block_id && (
							<div className={styles.error_msg}>Required</div>
						)}
					</div>

					<div
						role="presentation"
						className={styles.delete_block}
						onClick={() => {
							if (isEmpty(checkForSubBlock())) {
								removeSubBlock(subBlockIndex);
								return;
							}
							handleClick({ subBlockStatus: 'inactive' });
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
					setParam={setParam}
					setParamScoringType={setParamScoringType}
					error={errors?.blocks?.[blockIndex]?.sub_blocks?.[subBlockIndex]?.parameters}
				/>
			</div>

			{param ? (
				<AdditionalControlsModal
					param={param}
					setParam={setParam}
					watchSubBlock={watchSubBlock}
					paramScoringType={paramScoringType}
					setParamScoringType={setParamScoringType}
					additionalControls={additionalControls}
					setAdditionalControls={setAdditionalControls}
				/>
			) : null}

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
