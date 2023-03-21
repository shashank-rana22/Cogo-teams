import { Button } from '@cogoport/components';
import { useState } from 'react';

import AddQuestionsForm from '../CreateQuestionSet/components/AddQuestionsForm';

import NewQuestion from './components/NewQuestion';
import QuestionSet from './components/QuestionSet';
import TestDetails from './components/TestDetails';
import styles from './styles.module.css';

function CreateTest() {
	const [showQuestionSet, setShowQuestionSet] = useState(false);
	const [showNewQuestion, setShowNewQuestion] = useState(false);
	return (
		<div>
			<TestDetails />
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
			{showQuestionSet && <QuestionSet setShowNewQuestion={setShowNewQuestion} />}
			{showNewQuestion && <NewQuestion />}
			{showNewQuestion && <AddQuestionsForm />}
			{(showQuestionSet || showNewQuestion) && (
				<>
					<Button
						onClick={() => setShowNewQuestion(true)}
						size="md"
						themeType="secondary"
					>
						+ Add New Question
					</Button>
					<div className={`${styles.btn_container} ${styles.btn_cont_float}`}>
						<Button size="md" themeType="tertiary" style={{ marginRight: '10px' }}>
							Save As Draft
						</Button>
						<Button size="md" themeType="primary">Review And Set Validity</Button>
					</div>
				</>
			)}
		</div>
	);
}

export default CreateTest;
