import { Button } from '@cogoport/components';
import { SelectController } from '@cogoport/forms';
import { IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import FieldArray from '../../../../../../../common/Form/FieldArray';

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
		removeSubBlock,
		subBlockOptions,
		subBlockWiseParameterOptions,
		refetch,
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
	});

	return (
		<div className={styles.container}>
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
					/>

					{errors?.[`${name}.block`] && (
						<div className={styles.error_msg}>This is required</div>
					)}
				</div>

				<div role="presentation" className={styles.delete_block} onClick={() => removeSubBlock(subBlockIndex)}>
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

			<Button
				size="md"
				themeType="accent"
				type="button"
				className={styles.btn}
				onClick={handleClick}
			>
				Save
			</Button>
		</div>
	);
}

export default SubBlock;
