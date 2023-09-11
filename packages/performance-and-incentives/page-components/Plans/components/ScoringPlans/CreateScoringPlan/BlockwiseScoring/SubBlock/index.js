import { Button } from '@cogoport/components';
import { SelectController, InputController } from '@cogoport/forms';

import FieldArray from '../../../../../../../common/Form/FieldArray';
import getPrimaryControls from '../../../../../configurations/get-block-primary-controls';
// import getSubBlockControls from '../../../../../configurations/get-sub-block-controls';

import styles from './styles.module.css';

function SubBlock({ key = '', name = '', control = {}, errors = {}, subBlockType = '' }) {
	const controls = getPrimaryControls();

	const Element = subBlockType === 'group' ? InputController : SelectController;

	return (
		<div key={key} className={styles.container}>

			<div className={styles.inner_container}>
				<div className={styles.label}>
					Service or Default
					<sup className={styles.sup}>*</sup>
				</div>

				<div>
					<Element
						name={`${name}.service`}
						control={control}
					/>

					{errors[`${name}.block`] && (
						<div className={styles.error_msg}>This is required</div>
					)}
				</div>
			</div>

			<FieldArray
				control={control}
				name={`${name}.sublock_fieldArray`}
				controls={controls}
				isText
				buttonText="Add Parameter"
			/>

			<Button size="md" themeType="accent" className={styles.btn}>Save</Button>

		</div>
	);
}

export default SubBlock;
