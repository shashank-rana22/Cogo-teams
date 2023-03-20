import { Button } from '@cogoport/components';
import { useForm } from '@cogoport/forms';
import { useState } from 'react';

import useCreateTest from '../../../../hooks/useCreateTest';

// import NewQuestion from './components/NewQuestion';
import QuestionSet from './components/QuestionSet';
import TestDetails from './components/TestDetails';
import styles from './styles.module.css';

function DetailsAndQuestions({ setTestId, setActiveStepper }) {
	const [showQuestionSet, setShowQuestionSet] = useState(false);
	// const [allKeysSaved, setAllKeysSaved] = useState(false);
	const [idArray, setIdArray] = useState([]);

	const { loading, createTest } = useCreateTest({ setTestId, setActiveStepper });

	const { control, formState:{ errors }, watch } = useForm();

	return (
		<div className={styles.container}>
			<TestDetails control={control} watch={watch} errors={errors} />

			<div className={styles.btn_container}>
				{!showQuestionSet ? (
					<Button
						onClick={() => setShowQuestionSet(true)}
						size="md"
						themeType="primary"
						style={{ marginRight: '20px' }}
					>
						From Existing Question Set
					</Button>
				) : null}

				{/* {allKeysSaved ? (
					<Button
						onClick={() => setAllKeysSaved(false)}
						size="md"
						themeType="accent"
					>
						+ Add New Question
					</Button>
				) : null} */}

			</div>

			{showQuestionSet && <QuestionSet setIdArray={setIdArray} setShowQuestionSet={setShowQuestionSet} />}

			{/* {!allKeysSaved && <NewQuestion allKeysSaved={allKeysSaved} setAllKeysSaved={setAllKeysSaved} />} */}

			{showQuestionSet && (
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
