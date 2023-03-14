import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useState } from 'react';

import SingleQuestionComponent from '../SingleQuestionComponent';

import BasicDetails from './components/BasicDetails';
import CaseStudyForm from './components/CaseStudyForm';
import styles from './styles.module.css';

function CreateQuestion({ index }) {
	const [questionTypeWatch, setQuestionTypeWatch] = useState('stand_alone');

	const {
		// watch,
		// handleSubmit = () => {},
		// formState: { errors = {} },
		// reset,
		// setValue,
		// getValues,
		control,
		register,
	} = useForm();

	return (
		<div className={styles.container}>
			<div className={styles.question_label}>{`Question ${index + 1}`}</div>

			<div className={styles.form_component}>
				<BasicDetails setQuestionTypeWatch={setQuestionTypeWatch} />

				{questionTypeWatch === 'stand_alone' ? (
					<SingleQuestionComponent control={control} register={register} />
				) : (
					<CaseStudyForm control={control} register={register} />
				)}

				<div className={styles.button_container}>
					<Button type="button" themeType="accent">save Question</Button>
				</div>
			</div>

		</div>
	);
}

export default CreateQuestion;
