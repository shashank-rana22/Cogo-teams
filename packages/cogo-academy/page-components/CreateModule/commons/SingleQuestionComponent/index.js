import { Button } from '@cogoport/components';
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
	field,
	remove,
	editAnswerDetails,
	isNewQuestion,
	type,
}) {
	const controls = getControls();

	const handleDelete = () => {
		if (field.isNew) {
			remove(index, 1);
		}
	};

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

			{type === 'case_study' && !isNewQuestion ? (
				<div className={styles.button_container}>
					<Button onClick={() => handleDelete()} themeType="accent" size="sm" type="button">
						Delete
					</Button>

					<Button size="sm" type="button">
						Edit
					</Button>
				</div>

			) : null}
		</div>
	);
}

export default SingleQuestionComponent;
