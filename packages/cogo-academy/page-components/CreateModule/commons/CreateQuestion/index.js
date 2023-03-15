import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useState, useEffect } from 'react';

import useCreateTestQuestion from '../../hooks/useCreateTestQuestion';
import SingleQuestionComponent from '../SingleQuestionComponent';

import BasicDetails from './components/BasicDetails';
import CaseStudyForm from './components/CaseStudyForm';
import styles from './styles.module.css';

function CreateQuestion({ index, questionSetId }) {
	const [questionTypeWatch, setQuestionTypeWatch] = useState('stand_alone');

	console.log('questionSetId', questionSetId);

	const {
		watch,
		handleSubmit = () => {},
		formState: { errors = {} },
		// reset,
		// setValue,
		// getValues,
		control,
		register,
	} = useForm();

	const { createTestQuestion } = useCreateTestQuestion();

	const onsubmit = (values) => {
		createTestQuestion({ values, questionSetId });
	};

	const onError = (err) => {
		console.log('err', err);
	};

	useEffect(() => {
		setQuestionTypeWatch(watch('question_type'));
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [watch('question_type')]);

	return (
		<form onSubmit={handleSubmit(onsubmit, onError)} className={styles.container}>
			<div className={styles.question_label}>{`Question ${index + 1}`}</div>

			<div className={styles.form_component}>
				<BasicDetails errors={errors} control={control} />

				<div className={styles.question_form}>
					{questionTypeWatch === 'stand_alone' ? (
						<SingleQuestionComponent
							errors={errors.question?.[0] || {}}
							index={0}
							control={control}
							register={register}
							name="question"
						/>
					) : (
						<CaseStudyForm
							errors={{
								case_questions : errors.case_questions,
								question_text  : errors?.question_text,
							}}
							control={control}
							register={register}
						/>
					)}
				</div>

				<div className={styles.button_container}>
					<Button type="submit" themeType="accent">save Question</Button>
				</div>
			</div>

		</form>
	);
}

export default CreateQuestion;
