import { useForm } from '@cogoport/forms';

// import SingleQuestionComponent from '../SingleQuestionComponent';

import BasicDetails from './components/BasicDetails';
import CaseStudyForm from './components/CaseStudyForm';
import styles from './styles.module.css';

function CreateQuestion({ index }) {
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
				<BasicDetails />

				{/* <SingleQuestionComponent control={control} register={register} /> */}

				<CaseStudyForm control={control} register={register} />
			</div>
		</div>
	);
}

export default CreateQuestion;
