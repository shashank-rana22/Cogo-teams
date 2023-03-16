import { SelectController, InputController, ChipsController } from '@cogoport/forms';

import getControls from './controls';
import OptionsComponent from './OptionsComponent';
import styles from './styles.module.css';

function SingleQuestionComponent({
	control,
	register,
	index,
	name = 'case_questions',
	errors,
	editAnswerDetails,
}) {
	const controls = getControls();

	return (
		<div className={styles.container}>
			<div
				className={`${styles.first_row} ${
					errors?.[controls[0].name] ? styles[`${controls[0].name}_err`] : null
				} ${errors?.[controls[1].name] ? styles[`${controls[1].name}_err`] : null}`}
			>
				<InputController
					className={`${
						errors?.[controls[0].name] ? styles[`${controls[0].name}_err`] : null
					}`}
					{...controls[0]}
					control={control}
					name={`${name}.${index}.${controls[0].name}`}
				/>

				<SelectController
					className={`${styles.question_type} ${
						errors?.[controls[1].name]
							? styles[`${controls[1].name}_err`]
							: null
					}`}
					{...controls[1]}
					control={control}
					name={`${name}.${index}.${controls[1].name}`}
				/>
			</div>

			<OptionsComponent
				control={control}
				{...controls[2]}
				register={register}
				errors={errors?.options || {}}
				name={`${name}.${index}.${controls[2].name}`}
				editAnswerDetails={editAnswerDetails}
			/>

			<div className={styles.difficulty_level}>
				<div className={styles.label}>Set Difficulty level</div>

				<div className={styles.control}>
					<ChipsController control={control} {...controls[3]} name={`${name}.${index}.${controls[3].name}`} />
					{errors?.[controls[3].name] && <div className={styles.error_msg}>This is required</div>}
				</div>

			</div>
		</div>
	);
}

export default SingleQuestionComponent;
