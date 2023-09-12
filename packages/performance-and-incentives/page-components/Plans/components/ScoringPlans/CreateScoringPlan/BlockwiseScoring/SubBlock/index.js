import { Button } from '@cogoport/components';
import { IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import FieldArray from '../../../../../../../common/Form/FieldArray';

import styles from './styles.module.css';
import useSubBlockCreation from './useSubBlockCreation';

function SubBlock(props) {
	const {
		name = '', index = 0, subBlockIndex = 0, control = {}, errors = {}, watch = () => {},
		subBlockType = '', removeSubBlock = () => {}, subBlockOptions = [], parameterOptions = {}, refetch = () => {},
	} = props;

	const { Element, controls = [], handleClick = () => {}, parameterUnitOptions = {} } = useSubBlockCreation({
		parameterOptions,
		subBlockType,
		name,
		watch,
		index,
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

					<Element
						name={`${name}.sub_block_id`}
						control={control}
						options={subBlockOptions}
						value="default"
					/>

					{errors[`${name}.block`] && (
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
