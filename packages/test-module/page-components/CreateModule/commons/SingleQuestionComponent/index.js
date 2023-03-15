import { SelectController, InputController, ChipsController } from '@cogoport/forms';

import getControls from './controls';
import OptionsComponent from './OptionsComponent';
import styles from './styles.module.css';

function SingleQuestionComponent({ control, register }) {
	const controls = getControls();

	return (
		<div className={styles.container}>
			<div className={styles.first_row}>
				<InputController {...controls[0]} control={control} />

				<SelectController {...controls[1]} control={control} />
			</div>

			<OptionsComponent control={control} {...controls[2]} register={register} />

			<div className={styles.difficulty_level}>
				<div className={styles.label}>Set Difficulty level</div>
				<ChipsController control={control} {...controls[3]} />
			</div>
		</div>
	);
}

export default SingleQuestionComponent;
