import { Button } from '@cogoport/components';
import { SelectController, InputController } from '@cogoport/forms';
import { IcMDelete } from '@cogoport/icons-react';
import { startCase } from '@cogoport/utils';

import FieldArray from '../../../../../../../common/Form/FieldArray';
import getPrimaryControls from '../../../../../configurations/get-block-primary-controls';

import styles from './styles.module.css';

function SubBlock({
	key = '', name = '', index = 0, control = {}, errors = {},
	subBlockType = '', removeSubBlock = () => {}, isDefault = false,
}) {
	const controls = getPrimaryControls();

	const Element = subBlockType === 'group' ? InputController : SelectController;

	return (
		<div key={key} className={styles.container}>

			<div className={styles.inner_container}>

				<div className={styles.control_item}>
					<div className={styles.label}>
						Service or Default
						<sup className={styles.sup}>*</sup>
					</div>

					<Element
						name={`${name}.service`}
						control={control}
					/>

					{errors[`${name}.block`] && (
						<div className={styles.error_msg}>This is required</div>
					)}
				</div>

				<div role="presentation" className={styles.delete_block} onClick={() => removeSubBlock(index)}>
					<IcMDelete className={styles.icon} />

					<div className={styles.underline_text}>
						Delete
						{' '}
						{isDefault ? 'Sub Block' : startCase(subBlockType)}
					</div>
				</div>

			</div>

			<FieldArray
				control={control}
				name={`${name}.sublock_fieldArray`}
				controls={controls}
				isText
				buttonText="Add Parameter"
			/>

			<Button size="md" themeType="accent" type="button" className={styles.btn}>Save</Button>

		</div>
	);
}

export default SubBlock;
