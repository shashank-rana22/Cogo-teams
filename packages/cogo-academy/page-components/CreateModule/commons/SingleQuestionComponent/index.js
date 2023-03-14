import { SelectController, InputController, ChipsController } from '@cogoport/forms';

import getControls from './controls';
import OptionsComponent from './OptionsComponent';
import styles from './styles.module.css';

function SingleQuestionComponent({ control, register, index, name = 'case_questions' }) {
	const controls = getControls();

	return (
		<div className={styles.container}>
			<div className={styles.first_row}>
				<InputController
					{...controls[0]}
					control={control}
					name={`${name}.${index}.${controls[0].name}`}
				/>

				<SelectController
					className={styles.answer_type}
					{...controls[1]}
					control={control}
					name={`${name}.${index}.${controls[1].name}`}
				/>
			</div>

			<OptionsComponent
				control={control}
				{...controls[2]}
				register={register}
				name={`${name}.${index}.${controls[2].name}`}
			/>

			<div className={styles.difficulty_level}>
				<div className={styles.label}>Set Difficulty level</div>

				<ChipsController control={control} {...controls[3]} name={`${name}.${index}.${controls[3].name}`} />
			</div>
		</div>
	);
}

export default SingleQuestionComponent;
