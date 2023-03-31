import { Button } from '@cogoport/components';
import { TextAreaController, SelectController, InputController, ChipsController } from '@cogoport/forms';
import { useMemo } from 'react';

import useUpdateCaseStudyQuestion from '../../hooks/useUpdateCaseStudyQuestion';
import getRequiredControl from '../../utils/getRequiredControl';

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
	isNewQuestion,
	questionTypeWatch,
	editDetails,
	getValues,
	questionSetId,
	getTestQuestionTest,
	reset,
	setEditDetails,
	setAllKeysSaved,
	mode,
}) {
	const controls = useMemo(() => getControls({ mode }), [mode]);

	const { updateCaseStudyQuestion, loading } = useUpdateCaseStudyQuestion({
		questionSetId,
		getTestQuestionTest,
		setEditDetails,
		setAllKeysSaved,
		reset,
	});

	const handleDelete = () => {
		if (field.isNew) {
			remove(index, 1);
		} else {
			updateCaseStudyQuestion({
				action              : 'delete',
				caseStudyQuestionId : editDetails?.test_case_study_questions?.[index]?.id,
				testQuestionId      : editDetails?.id,
			});
		}
	};

	const handleUpdateCaseStudyQuestion = () => {
		const formValues = getValues();

		updateCaseStudyQuestion({
			values              : formValues?.case_questions?.[index],
			action              : field.isNew ? 'create' : 'update',
			caseStudyQuestionId : editDetails?.test_case_study_questions?.[index]?.id,
			testQuestionId      : editDetails?.id,
		});
	};

	return (
		<div className={styles.container}>
			<div
				className={`${styles.first_row} ${
					errors?.question_text ? styles.question_text_err : null
				} ${errors?.question_type ? styles.question_type_err : null}`}
			>
				<InputController
					className={`${
						errors?.question_text ? styles.question_text_err : null
					} ${styles.input_container}`}
					{...getRequiredControl({ controls, name: 'question_text' })}
					control={control}
					name={`${name}.${index}.question_text`}
				/>

				<SelectController
					className={`${styles.question_type} ${
						errors?.question_type
							? styles.question_type_err
							: null
					}`}
					{...getRequiredControl({ controls, name: 'question_type' })}
					control={control}
					name={`${name}.${index}.question_type`}
				/>
			</div>

			<OptionsComponent
				control={control}
				{...getRequiredControl({ controls, name: 'options' })}
				register={register}
				errors={errors?.options || {}}
				name={`${name}.${index}.options`}
				mode={mode}
				isNewQuestion={isNewQuestion}
			/>

			{questionTypeWatch !== 'case_study' ? (
				<div className={styles.difficulty_level}>
					<div className={styles.label}>Set Difficulty level</div>

					<div className={styles.control}>
						<ChipsController
							control={control}
							{...getRequiredControl({ controls, name: 'difficulty_level' })}
							name={`${name}.${index}.difficulty_level`}
						/>
						{errors?.difficulty_level && <div className={styles.error_msg}>This is required</div>}
					</div>
				</div>
			) : null}

			<div className={styles.textarea_container}>
				<TextAreaController
					control={control}
					{...getRequiredControl({ controls, name: 'explanation' })}
					name={`${name}.${index}.explanation`}
				/>
			</div>

			{questionTypeWatch === 'case_study' && mode !== 'view' ? (
				<div className={styles.button_container}>
					<Button
						loading={loading}
						onClick={() => handleDelete()}
						themeType="accent"
						size="sm"
						type="button"
					>
						Delete
					</Button>

					{isNewQuestion ? (
						<Button
							style={{ marginLeft: '12px' }}
							loading={loading}
							onClick={() => handleUpdateCaseStudyQuestion()}
							size="sm"
							type="button"
						>
							{field?.isNew ? 'Save' : 'Edit'}
						</Button>
					) : null}
				</div>
			) : null}
		</div>
	);
}

export default SingleQuestionComponent;
