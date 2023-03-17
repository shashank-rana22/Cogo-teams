import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useState } from 'react';

import useCreateTest from '../../../../hooks/useCreateTest';
import AddQuestionsForm from '../../../CreateQuestionSet/components/AddQuestionsForm';

import NewQuestion from './components/NewQuestion';
import QuestionSet from './components/QuestionSet';
import TestDetails from './components/TestDetails';
import styles from './styles.module.css';

function DetailsAndQuestions({ setTestId, setActiveStepper }) {
	const [showQuestionSet, setShowQuestionSet] = useState(false);
	const [showNewQuestion, setShowNewQuestion] = useState(false);
	const [idArray, setIdArray] = useState([]);
	const { loading, createTest } = useCreateTest({ setTestId, setActiveStepper });
	const { control, formState:{ errors }, watch } = useForm();
	return (
		<div className={styles.container}>
			<TestDetails control={control} watch={watch} errors={errors} />
			{!showQuestionSet && !showNewQuestion && (
				<div className={styles.btn_container}>
					<Button
						onClick={() => setShowQuestionSet(true)}
						size="md"
						themeType="primary"
						style={{ marginRight: '20px' }}
					>
						From Existing Question Set
					</Button>
					<Button
						onClick={() => setShowNewQuestion(true)}
						size="md"
						themeType="accent"
					>
						+ Add New Question
					</Button>
				</div>
			)}
			{showQuestionSet && <QuestionSet setIdArray={setIdArray} />}
			{showNewQuestion && <NewQuestion />}
			{showNewQuestion && <AddQuestionsForm />}

			{/* <Button
				onClick={() => setShowNewQuestion(true)}
				size="md"
				themeType="secondary"
			>
				+ Add New Question
			</Button> */}
			{(showQuestionSet || showNewQuestion) && (
				<div className={`${styles.btn_container} ${styles.btn_cont_float}`}>
					<Button
						loading={loading}
						size="md"
						themeType="tertiary"
						style={{ marginRight: '10px' }}
						onClick={() => {
							const data = watch();
							createTest({ data, idArray });
						}}
					>
						Save As Draft
					</Button>
					<Button
						size="md"
						themeType="primary"
						onClick={() => {
							const data = watch();
							console.log('data:: ', data);
							createTest({ data, idArray });
						}}
					>
						Review And Set Validity

					</Button>
				</div>
			)}

		</div>
	);
}

export default DetailsAndQuestions;
